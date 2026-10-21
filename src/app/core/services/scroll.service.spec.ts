import { TestBed } from '@angular/core/testing';

import { HEADER_OFFSET, ScrollService } from './scroll.service';
import { SectionStateService } from './section-state.service';

describe('ScrollService', () => {
  let service: ScrollService;
  let sections: SectionStateService;
  let openUpTo: jasmine.Spy;
  let scrollTo: jasmine.Spy;
  let target: HTMLElement | null;

  function addTarget(id: string): HTMLElement {
    target = document.createElement('div');
    target.id = id;
    document.body.appendChild(target);
    return target;
  }

  beforeEach(() => {
    service = TestBed.inject(ScrollService);
    sections = TestBed.inject(SectionStateService);

    spyOn(window, 'requestAnimationFrame').and.callFake(cb => {
      cb(0);
      return 1;
    });
    scrollTo = spyOn(window, 'scrollTo');
    openUpTo = spyOn(sections, 'openUpTo');
    target = null;
  });

  afterEach(() => {
    target?.remove();
  });

  it('opens sections up to the target before scrolling', () => {
    addTarget('projects');

    service.goTo('projects');

    expect(openUpTo).toHaveBeenCalledWith('projects');
    expect(scrollTo).toHaveBeenCalledTimes(1);
    expect(openUpTo).toHaveBeenCalledBefore(scrollTo);
  });

  it('scrolls to the element top minus the header offset with smooth behavior', () => {
    const el = addTarget('projects');
    const expectedTop = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    service.goTo('projects');

    expect(HEADER_OFFSET).toBe(80);
    expect(scrollTo).toHaveBeenCalledWith(
      jasmine.objectContaining({ top: expectedTop, behavior: 'smooth' })
    );
  });

  it('scrolls to a non-collapsible id', () => {
    addTarget('about');

    service.goTo('about');

    expect(openUpTo).toHaveBeenCalledWith('about');
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });

  it('does nothing for an unknown id', () => {
    expect(() => service.goTo('does-not-exist')).not.toThrow();

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('uses auto behavior under prefers-reduced-motion', () => {
    spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList);
    addTarget('projects');

    service.goTo('projects');

    expect(scrollTo).toHaveBeenCalledWith(jasmine.objectContaining({ behavior: 'auto' }));
  });
});
