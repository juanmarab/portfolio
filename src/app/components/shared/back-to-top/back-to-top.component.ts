import { Component, HostListener, OnDestroy, inject, signal } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';
import { prefersReducedMotion } from '../../../core/utils/motion';

const SHOW_AFTER_PX = 600;

/** Floating "back to top" button, bottom-right, shown once the visitor has scrolled past the hero. */
@Component({
  selector: 'app-back-to-top',
  standalone: true,
  template: `
    <button type="button" class="back-to-top" [class.is-visible]="visible()" (click)="scrollToTop()"
      [attr.aria-label]="lang.t().common.back_to_top" [attr.tabindex]="visible() ? 0 : -1"
      [attr.aria-hidden]="visible() ? null : 'true'">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M8 13V3" />
        <path d="M3.5 7.5 8 3l4.5 4.5" />
      </svg>
    </button>
  `,
  styles: [`
    :host {
      position: fixed;
      right: max(1rem, env(safe-area-inset-right));
      bottom: max(1rem, env(safe-area-inset-bottom));
      z-index: 900;
      pointer-events: none;
    }

    .back-to-top {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid var(--color-border-hover);
      background: rgba(20, 20, 24, 0.85);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      color: var(--color-text-main);
      cursor: pointer;
      box-shadow: var(--shadow-lg);
      opacity: 0;
      transform: translateY(12px) scale(0.9);
      pointer-events: none;
      transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out),
        background-color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
    }

    .back-to-top.is-visible {
      opacity: 1;
      transform: none;
      pointer-events: auto;
    }

    @media (hover: hover) {
      .back-to-top:hover {
        background: var(--color-primary);
        border-color: var(--color-primary);
        transform: translateY(-2px);
      }
    }

    @media (min-width: 768px) {
      :host {
        right: max(1.5rem, env(safe-area-inset-right));
        bottom: max(1.5rem, env(safe-area-inset-bottom));
      }
    }

    @media print {
      :host { display: none; }
    }
  `]
})
export class BackToTopComponent implements OnDestroy {
  readonly lang = inject(LanguageService);
  readonly visible = signal(false);

  private frame = 0;

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onScroll(): void {
    if (this.frame) {
      return;
    }
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.visible.set(window.scrollY > SHOW_AFTER_PX);
    });
  }

  ngOnDestroy(): void {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}
