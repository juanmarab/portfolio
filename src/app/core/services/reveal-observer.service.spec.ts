import { TestBed } from '@angular/core/testing';

import { RevealObserverService } from './reveal-observer.service';

class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];

  observe = jasmine.createSpy('observe');
  unobserve = jasmine.createSpy('unobserve');

  constructor(
    public callback: (entries: Array<{ target: Element; isIntersecting: boolean }>) => void,
    public options?: IntersectionObserverInit
  ) {
    FakeIntersectionObserver.instances.push(this);
  }
}

function fire(instance: FakeIntersectionObserver, el: Element, isIntersecting: boolean): void {
  instance.callback([{ target: el, isIntersecting }]);
}

describe('RevealObserverService', () => {
  const win = window as any;
  let originalObserver: unknown;
  let service: RevealObserverService;
  let el: HTMLElement;

  beforeEach(() => {
    originalObserver = win.IntersectionObserver;
    FakeIntersectionObserver.instances = [];
    win.IntersectionObserver = FakeIntersectionObserver;

    service = TestBed.inject(RevealObserverService);
    el = document.createElement('div');
  });

  afterEach(() => {
    win.IntersectionObserver = originalObserver;
  });

  it('calls onVisible when the element intersects', () => {
    const spy = jasmine.createSpy('onVisible');

    service.observe(el, spy);
    fire(FakeIntersectionObserver.instances[0], el, true);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('ignores non-intersecting entries', () => {
    const spy = jasmine.createSpy('onVisible');

    service.observe(el, spy);
    fire(FakeIntersectionObserver.instances[0], el, false);

    expect(spy).not.toHaveBeenCalled();
  });

  it('reuses one observer per options key', () => {
    service.observe(el, () => {});
    service.observe(document.createElement('div'), () => {});
    expect(FakeIntersectionObserver.instances.length).toBe(1);

    service.observe(document.createElement('div'), () => {}, { rootMargin: '0px 0px -40% 0px' });
    expect(FakeIntersectionObserver.instances.length).toBe(2);
  });

  it('unsubscribe unobserves and stops callbacks', () => {
    const spy = jasmine.createSpy('onVisible');

    const stop = service.observe(el, spy);
    stop();

    const instance = FakeIntersectionObserver.instances[0];
    expect(instance.unobserve).toHaveBeenCalledWith(el);

    fire(instance, el, true);
    expect(spy).not.toHaveBeenCalled();
  });

  it('calls onVisible immediately when IntersectionObserver is unavailable', () => {
    delete win.IntersectionObserver;
    const spy = jasmine.createSpy('onVisible');

    service.observe(el, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
