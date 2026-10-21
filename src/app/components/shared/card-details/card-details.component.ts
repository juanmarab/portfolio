import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

let nextId = 0;

/**
 * Expandable card: the projected `[cardHeader]` (logo, title, description) is always
 * visible and acts as the click target; the rest of the content stays in the DOM,
 * clipped and inert while closed, and expands on click. A small chevron button
 * carries the accessible state for keyboard and screen-reader users.
 */
@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-head" [class.is-open]="open()" (click)="toggle()">
      <div class="card-head-main"><ng-content select="[cardHeader]" /></div>
      <button type="button" class="card-chevron" (click)="toggle(); $event.stopPropagation()"
        [attr.aria-expanded]="open()" [attr.aria-controls]="bodyId"
        [attr.aria-label]="open() ? lang.t().cards.hide_details : lang.t().cards.show_details">
        <span class="chev" aria-hidden="true"></span>
      </button>
    </div>
    <div class="details" [class.is-open]="open()" [attr.inert]="open() ? null : ''" [id]="bodyId">
      <div class="details-inner"><ng-content /></div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .card-head {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      cursor: pointer;
    }

    .card-head-main {
      flex: 1 1 auto;
      min-width: 0;
    }

    .card-chevron {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid var(--color-border);
      background: rgba(255, 255, 255, 0.04);
      color: var(--color-text-muted);
      cursor: pointer;
      transition: background-color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out);
    }

    .chev {
      width: 8px;
      height: 8px;
      border-right: 2px solid currentColor;
      border-bottom: 2px solid currentColor;
      transform: translateY(-2px) rotate(45deg);
      transition: transform var(--dur-base) var(--ease-out);
    }

    .card-head.is-open .chev {
      transform: translateY(2px) rotate(225deg);
    }

    @media (hover: hover) {
      .card-head:hover .card-chevron {
        background: rgba(255, 255, 255, 0.1);
        border-color: var(--color-border-hover);
        color: var(--color-text-main);
      }
    }

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

    /* Gap between the header and the detail content, clipped away while closed */
    .details-inner::before {
      content: '';
      display: block;
      height: 1.25rem;
    }

    /* Project cards carry their own padding inside the header and body */
    :host-context(.project-card) .card-head { padding-right: 1.25rem; align-items: center; }
    :host-context(.project-card) .details-inner::before { height: 0; }

    @media (min-width: 768px) {
      :host-context(.project-card) .card-head { padding-right: 2rem; }
    }

    @media print {
      .details { grid-template-rows: 1fr !important; }
      .card-chevron { display: none; }
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
