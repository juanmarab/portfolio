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

  describe('instant', () => {
    let frames: Map<number, FrameRequestCallback>;
    let cancelSpy: jasmine.Spy;

    // Frames only run when the test fires them; cancelled ones are dropped.
    function stubAnimationFrames(): void {
      frames = new Map();
      let nextId = 1;
      spyOn(window, 'requestAnimationFrame').and.callFake(cb => {
        frames.set(nextId, cb);
        return nextId++;
      });
      cancelSpy = spyOn(window, 'cancelAnimationFrame').and.callFake(id => {
        frames.delete(id);
      });
    }

    function runNextFrame(): void {
      const [id, cb] = frames.entries().next().value!;
      frames.delete(id);
      cb(0);
    }

    beforeEach(() => {
      stubAnimationFrames();
      service.register('a');
    });

    it('openUpTo keeps instant for two animation frames', () => {
      service.openUpTo('a');
      expect(service.instant()).toBeTrue();

      runNextFrame();
      expect(service.instant()).toBeTrue();

      runNextFrame();
      expect(service.instant()).toBeFalse();
      expect(frames.size).toBe(0);
    });

    it('a second openUpTo before the frames fire cancels the earlier reset', () => {
      service.openUpTo('a');
      const firstFrameId = Array.from(frames.keys())[0];

      service.openUpTo('a');
      expect(cancelSpy).toHaveBeenCalledOnceWith(firstFrameId);
      expect(frames.size).toBe(1);

      runNextFrame();
      expect(service.instant()).toBeTrue();

      runNextFrame();
      expect(service.instant()).toBeFalse();
    });
  });
});
