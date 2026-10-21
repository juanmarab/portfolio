import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RevealObserverService } from '../../../core/services/reveal-observer.service';
import { SectionStateService } from '../../../core/services/section-state.service';
import { SectionShellComponent } from './section-shell.component';

@Component({
  standalone: true,
  imports: [SectionShellComponent],
  template: `
    <app-section-shell sectionId="b" title="Projects" meta="5 projects" [startOpen]="startOpen">
      <p class="inner">hello</p>
    </app-section-shell>
  `
})
class HostComponent {
  startOpen = false;
}

describe('SectionShellComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let sections: SectionStateService;
  let observe: jasmine.Spy;
  let stopSpy: jasmine.Spy;
  let captured: (() => void) | undefined;

  function render(): void {
    fixture.detectChanges();
  }

  function fireObserver(): void {
    if (!captured) {
      throw new Error('The section never subscribed to the reveal observer');
    }
    captured();
  }

  function shell(): SectionShellComponent {
    return fixture.debugElement.query(By.directive(SectionShellComponent)).componentInstance;
  }

  function section(): HTMLElement {
    return fixture.nativeElement.querySelector('section');
  }

  function toggleButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('h2 > button');
  }

  function body(): HTMLElement {
    return fixture.nativeElement.querySelector('.section-body');
  }

  beforeEach(() => {
    captured = undefined;
    stopSpy = jasmine.createSpy('stop');
    observe = jasmine.createSpy('observe').and.callFake((_el: Element, onVisible: () => void) => {
      captured = onVisible;
      return stopSpy;
    });

    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: RevealObserverService, useValue: { observe } }]
    });

    sections = TestBed.inject(SectionStateService);
    fixture = TestBed.createComponent(HostComponent);
  });

  it('renders h2 > button with aria-expanded=false and aria-controls to the body', () => {
    render();

    const button = toggleButton();
    expect(button).not.toBeNull();
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(button.getAttribute('aria-controls')).toBe('b-body');
    expect(button.textContent).toContain('Projects');
    expect(button.textContent).toContain('5 projects');
    expect(fixture.nativeElement.querySelector('#b-body')).toBe(body());
  });

  it('projects content and keeps it in the DOM while closed', () => {
    render();

    expect(shell().open()).toBeFalse();
    expect(fixture.nativeElement.querySelector('.inner').textContent).toBe('hello');
  });

  it('body is inert while closed and not inert when open', () => {
    render();
    expect(body().hasAttribute('inert')).toBeTrue();

    toggleButton().click();
    render();

    expect(body().hasAttribute('inert')).toBeFalse();
  });

  it('startOpen opens on init', () => {
    fixture.componentInstance.startOpen = true;
    render();

    expect(shell().open()).toBeTrue();
    expect(section().classList).toContain('is-open');
    expect(toggleButton().getAttribute('aria-expanded')).toBe('true');
    expect(observe).not.toHaveBeenCalled();
  });

  it('clicking the button toggles', () => {
    render();

    toggleButton().click();
    render();
    expect(shell().open()).toBeTrue();
    expect(toggleButton().getAttribute('aria-expanded')).toBe('true');

    toggleButton().click();
    render();
    expect(shell().open()).toBeFalse();
    expect(toggleButton().getAttribute('aria-expanded')).toBe('false');
  });

  it('auto-opens when the observer fires and stops observing', () => {
    render();
    expect(observe).toHaveBeenCalledWith(
      toggleButton(),
      jasmine.any(Function),
      { rootMargin: '100000px 0px -40% 0px', threshold: 0 }
    );

    fireObserver();
    render();

    expect(shell().open()).toBeTrue();
    expect(section().classList).toContain('is-open');
    expect(stopSpy).toHaveBeenCalledTimes(1);
  });

  it('does not auto-open while an earlier section has never been opened', () => {
    sections.register('a');
    render();

    fireObserver();
    render();
    expect(shell().open()).toBeFalse();
    expect(stopSpy).not.toHaveBeenCalled();

    sections.open('a');
    fireObserver();
    render();
    expect(shell().open()).toBeTrue();
  });

  it('auto-opens later sections even if an earlier one was closed by hand', () => {
    sections.register('a');
    sections.open('a');
    sections.close('a');
    render();

    fireObserver();
    render();

    expect(shell().open()).toBeTrue();
  });

  it('does not re-open after a manual close', () => {
    render();

    fireObserver();
    render();
    toggleButton().click();
    render();
    expect(shell().open()).toBeFalse();

    fireObserver();
    render();
    expect(shell().open()).toBeFalse();
  });

  it('opens immediately when the observer reports synchronously', () => {
    observe.and.callFake((_el: Element, onVisible: () => void) => {
      onVisible();
      return stopSpy;
    });

    render();

    expect(shell().open()).toBeTrue();
    expect(section().classList).toContain('is-open');
    expect(stopSpy).toHaveBeenCalledTimes(1);
  });

  it('unsubscribes on destroy', () => {
    render();
    expect(stopSpy).not.toHaveBeenCalled();

    fixture.destroy();

    expect(stopSpy).toHaveBeenCalledTimes(1);
  });

  it('adds no-transition while the state service is in instant mode', () => {
    spyOn(window, 'requestAnimationFrame').and.returnValue(1);
    render();
    expect(section().classList).not.toContain('no-transition');

    sections.openUpTo('b');
    render();

    expect(section().classList).toContain('no-transition');
  });
});
