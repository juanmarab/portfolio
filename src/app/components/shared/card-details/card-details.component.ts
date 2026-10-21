import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

let nextId = 0;

/**
 * Collapsible detail area for a card (experience, project, education).
 * The projected content stays in the DOM, is clipped while closed and
 * becomes inert so it never receives focus; a toggle button opens it.
 */
@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="details" [class.is-open]="open()" [attr.inert]="open() ? null : ''" [id]="bodyId">
      <div class="details-inner"><ng-content /></div>
    </div>
    <button type="button" class="details-toggle" [class.is-open]="open()" (click)="toggle()"
      [attr.aria-expanded]="open()" [attr.aria-controls]="bodyId">
      <span>{{ open() ? lang.t().cards.hide_details : lang.t().cards.show_details }}</span>
      <span class="details-chevron" aria-hidden="true"></span>
    </button>
  `,
  styles: [`
    :host { display: block; }

    .details {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--dur-slow) var(--ease-out);
    }

    .details.is-open { grid-template-rows: 1fr; }

    .details-inner {
      min-height: 0;
      overflow: hidden;
      overflow: clip;
    }

    /* Gap between the detail content and the toggle, clipped away while closed */
    .details-inner::after {
      content: '';
      display: block;
      height: 1.25rem;
    }

    .details-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      width: 100%;
      min-height: 44px;
      padding: 0.55rem 1rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border);
      background: rgba(255, 255, 255, 0.04);
      color: var(--color-text-main);
      font-family: 'Outfit', sans-serif;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
    }

    .details-toggle:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--color-border-hover);
    }

    .details-chevron {
      width: 8px;
      height: 8px;
      border-right: 2px solid currentColor;
      border-bottom: 2px solid currentColor;
      transform: translateY(-2px) rotate(45deg);
      transition: transform var(--dur-base) var(--ease-out);
    }

    .details-toggle.is-open .details-chevron {
      transform: translateY(2px) rotate(225deg);
    }

    /* Project cards have no padding of their own: inset the toggle */
    :host-context(.project-card) .details-toggle {
      width: calc(100% - 2.5rem);
      margin: 1.25rem 1.25rem 1.25rem;
    }

    :host-context(.project-card) .details-inner::after { height: 0; }

    @media (min-width: 768px) {
      :host-context(.project-card) .details-toggle {
        width: calc(100% - 4rem);
        margin: 1.5rem 2rem 1.5rem;
      }
    }

    @media print {
      .details { grid-template-rows: 1fr !important; }
      .details-toggle { display: none; }
    }
  `]
})
export class CardDetailsComponent implements OnInit {
  @Input() startOpen = false;

  readonly lang = inject(LanguageService);
  readonly bodyId = `card-details-${++nextId}`;
  readonly open = signal(false);

  ngOnInit(): void {
    if (this.startOpen) {
      this.open.set(true);
    }
  }

  toggle(): void {
    this.open.update(value => !value);
  }
}
