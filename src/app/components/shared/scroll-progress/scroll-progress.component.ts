import { Component, HostListener, OnDestroy, signal } from '@angular/core';

/** Fraction of the page scrolled, from 0 (top) to 1 (bottom). */
export function computeProgress(scrollY: number, scrollHeight: number, innerHeight: number): number {
  const scrollable = scrollHeight - innerHeight;
  if (scrollable <= 0) {
    return 0;
  }
  return Math.min(1, Math.max(0, scrollY / scrollable));
}

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  template: `<div class="bar" [style.transform]="'scaleX(' + progress() + ')'"></div>`,
  styles: [`
    :host {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      pointer-events: none;
    }

    .bar {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 2px;
      width: 100%;
      transform-origin: left;
      background: var(--gradient-primary);
    }
  `]
})
export class ScrollProgressComponent implements OnDestroy {
  readonly progress = signal(0);

  private frame = 0;

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.frame) {
      return;
    }
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.progress.set(
        computeProgress(window.scrollY, document.documentElement.scrollHeight, window.innerHeight)
      );
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
  }
}
