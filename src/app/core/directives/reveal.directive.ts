import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit, inject } from '@angular/core';

import { RevealObserverService } from '../services/reveal-observer.service';
import { prefersReducedMotion } from '../utils/motion';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;
  /** Overrides the service's default visibility threshold, e.g. 0 for very tall hosts. */
  @Input() revealThreshold?: number;

  @HostBinding('class.reveal') readonly reveal = true;
  @HostBinding('class.is-visible') visible = false;

  private host = inject<ElementRef<Element>>(ElementRef);
  private revealObserver = inject(RevealObserverService);
  private stop?: () => void;

  @HostBinding('style.--reveal-delay')
  get delay(): string {
    return `${this.revealDelay}ms`;
  }

  ngOnInit(): void {
    if (prefersReducedMotion()) {
      this.visible = true;
      return;
    }

    // The service may call back synchronously, before `stop` is assigned.
    const onVisible = () => {
      this.visible = true;
      this.stop?.();
    };
    this.stop = this.revealThreshold === undefined
      ? this.revealObserver.observe(this.host.nativeElement, onVisible)
      : this.revealObserver.observe(this.host.nativeElement, onVisible, { threshold: this.revealThreshold });
  }

  ngOnDestroy(): void {
    this.stop?.();
  }
}
