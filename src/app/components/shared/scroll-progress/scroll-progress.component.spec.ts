import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollProgressComponent, computeProgress } from './scroll-progress.component';

describe('computeProgress', () => {
  it('is 0 at the top', () => {
    expect(computeProgress(0, 2000, 800)).toBe(0);
  });

  it('is 0.5 halfway', () => {
    expect(computeProgress(600, 2000, 800)).toBe(0.5);
  });

  it('clamps to 1', () => {
    expect(computeProgress(5000, 2000, 800)).toBe(1);
  });

  it('is 0 when the page does not scroll', () => {
    expect(computeProgress(0, 700, 800)).toBe(0);
  });
});

describe('ScrollProgressComponent', () => {
  let component: ScrollProgressComponent;
  let fixture: ComponentFixture<ScrollProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollProgressComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the bar scaled by progress', () => {
    component.progress.set(0.25);
    fixture.detectChanges();

    const bar: HTMLElement = fixture.nativeElement.querySelector('.bar');
    expect(bar.style.transform).toBe('scaleX(0.25)');
  });

  it('seeds progress after the first render', () => {
    const raf = spyOn(window, 'requestAnimationFrame').and.callFake((cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(600);
    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(800);
    spyOnProperty(document.documentElement, 'scrollHeight', 'get').and.returnValue(2000);

    const seeded = TestBed.createComponent(ScrollProgressComponent);
    seeded.detectChanges();

    expect(raf).toHaveBeenCalledTimes(1);
    expect(seeded.componentInstance.progress()).toBe(0.5);
  });

  it('keeps a single animation frame pending while scrolling', async () => {
    // Let the frame requested by the first-render seed run first.
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    const raf = spyOn(window, 'requestAnimationFrame').and.returnValue(1);

    component.scheduleUpdate();
    component.scheduleUpdate();

    expect(raf).toHaveBeenCalledTimes(1);
  });
});
