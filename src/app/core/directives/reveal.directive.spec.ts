import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealObserverService } from '../services/reveal-observer.service';
import { RevealDirective } from './reveal.directive';

@Component({
  standalone: true,
  imports: [RevealDirective],
  template: '<div appReveal [revealDelay]="120"></div>'
})
class HostComponent {}

@Component({
  standalone: true,
  imports: [RevealDirective],
  template: '<div appReveal [revealThreshold]="0"></div>'
})
class ThresholdHostComponent {}

describe('RevealDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let captured: (() => void) | undefined;
  let stopSpy: jasmine.Spy;
  let fakeObserver: { observe: jasmine.Spy };

  const createHost = (): HTMLElement => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('div') as HTMLElement;
  };

  beforeEach(() => {
    captured = undefined;
    stopSpy = jasmine.createSpy('stop');
    fakeObserver = {
      observe: jasmine.createSpy('observe').and.callFake((_el: Element, onVisible: () => void) => {
        captured = onVisible;
        return stopSpy;
      })
    };

    TestBed.configureTestingModule({
      imports: [HostComponent, ThresholdHostComponent],
      providers: [{ provide: RevealObserverService, useValue: fakeObserver }]
    });
  });

  it('adds the reveal class and starts hidden', () => {
    const el = createHost();

    expect(el.classList.contains('reveal')).toBeTrue();
    expect(el.classList.contains('is-visible')).toBeFalse();
    expect(fakeObserver.observe).toHaveBeenCalledTimes(1);
  });

  it('becomes visible when the observer reports and unsubscribes', () => {
    const el = createHost();

    captured!();
    fixture.detectChanges();

    expect(el.classList.contains('is-visible')).toBeTrue();
    expect(stopSpy).toHaveBeenCalledTimes(1);
  });

  it('exposes revealDelay as --reveal-delay', () => {
    const el = createHost();

    expect(el.style.getPropertyValue('--reveal-delay')).toBe('120ms');
  });

  it('forwards revealThreshold to the observer', () => {
    TestBed.createComponent(ThresholdHostComponent).detectChanges();

    expect(fakeObserver.observe).toHaveBeenCalledTimes(1);
    expect(fakeObserver.observe.calls.mostRecent().args[2]).toEqual(jasmine.objectContaining({ threshold: 0 }));
  });

  it('is visible immediately under prefers-reduced-motion', () => {
    spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList);

    const el = createHost();

    expect(el.classList.contains('is-visible')).toBeTrue();
    expect(fakeObserver.observe).not.toHaveBeenCalled();
  });
});
