import { computed } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SectionStateService } from './section-state.service';

describe('SectionStateService', () => {
  let service: SectionStateService;

  beforeEach(() => {
    service = TestBed.inject(SectionStateService);
  });

  it('register keeps document order and starts closed', () => {
    service.register('a');
    service.register('b');
    service.register('a');

    expect(service.ids()).toEqual(['a', 'b']);
    expect(service.isOpen('a')).toBeFalse();
    expect(service.isOpen('b')).toBeFalse();
  });

  it('open, close and toggle update isOpen', () => {
    service.register('a');
    const open = computed(() => service.isOpen('a'));
    expect(open()).toBeFalse();

    service.open('a');
    expect(service.isOpen('a')).toBeTrue();
    expect(open()).toBeTrue();

    service.close('a');
    expect(service.isOpen('a')).toBeFalse();
    expect(open()).toBeFalse();

    service.toggle('a');
    expect(service.isOpen('a')).toBeTrue();

    service.toggle('a');
    expect(service.isOpen('a')).toBeFalse();
  });

  it('hasBeenOpened stays true after close', () => {
    service.register('a');
    expect(service.hasBeenOpened('a')).toBeFalse();

    service.open('a');
    service.close('a');

    expect(service.isOpen('a')).toBeFalse();
    expect(service.hasBeenOpened('a')).toBeTrue();
    expect(service.hasBeenOpened('unknown')).toBeFalse();
  });

  it('openUpTo opens every section up to the target and none after', () => {
    ['a', 'b', 'c', 'd'].forEach(id => service.register(id));

    service.openUpTo('c');

    expect(service.isOpen('a')).toBeTrue();
    expect(service.isOpen('b')).toBeTrue();
    expect(service.isOpen('c')).toBeTrue();
    expect(service.isOpen('d')).toBeFalse();
    expect(service.hasBeenOpened('c')).toBeTrue();
    expect(service.hasBeenOpened('d')).toBeFalse();
  });

  it('openUpTo with an unknown id changes nothing', () => {
    ['a', 'b'].forEach(id => service.register(id));

    service.openUpTo('zzz');

    expect(service.isOpen('a')).toBeFalse();
    expect(service.isOpen('b')).toBeFalse();
    expect(service.instant()).toBeFalse();
  });

  it('openUpTo sets instant until the next animation frame', () => {
    let frame: FrameRequestCallback = () => {};
    spyOn(window, 'requestAnimationFrame').and.callFake(cb => {
      frame = cb;
      return 1;
    });
    service.register('a');

    service.openUpTo('a');
    expect(service.instant()).toBeTrue();

    frame(0);
    expect(service.instant()).toBeFalse();
  });
});
