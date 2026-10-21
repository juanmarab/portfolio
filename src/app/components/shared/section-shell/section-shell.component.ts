import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, computed, effect, inject } from '@angular/core';

import { RevealObserverService } from '../../../core/services/reveal-observer.service';
import { SectionStateService } from '../../../core/services/section-state.service';

@Component({
  selector: 'app-section-shell',
  standalone: true,
  templateUrl: './section-shell.component.html',
  styleUrls: ['./section-shell.component.css'],
  imports: [CommonModule],
})
export class SectionShellComponent implements OnInit, OnDestroy {
  @Input({ required: true }) sectionId!: string;
  @Input() title = '';
  @Input() meta?: string;
  @Input() tone: 'dark' | 'light' = 'light';
  @Input() startOpen = false;

  @ViewChild('toggleBtn', { static: true }) private toggleBtn!: ElementRef<HTMLButtonElement>;

  readonly sections = inject(SectionStateService);
  private readonly observer = inject(RevealObserverService);

  readonly open = computed(() => this.sections.isOpen(this.sectionId));

  private stop?: () => void;

  constructor() {
    effect(() => {
      if (this.open()) {
        this.stopObserving();
      }
    });
  }

  ngOnInit(): void {
    this.sections.register(this.sectionId);

    if (this.startOpen) {
      this.sections.open(this.sectionId);
      return;
    }

    // The huge top margin makes buttons already scrolled past count as intersecting,
    // so a fast fling cannot leave a closed section above the reader.
    this.stop = this.observer.observe(
      this.toggleBtn.nativeElement,
      () => this.autoOpen(),
      { rootMargin: '100000px 0px -40% 0px', threshold: 0 }
    );
  }

  ngOnDestroy(): void {
    this.stopObserving();
  }

  toggle(): void {
    this.sections.toggle(this.sectionId);
  }

  /**
   * Opens on scroll, but only in page order and only once: a section waits for every
   * earlier one to have been opened, and never re-opens after the visitor closed it.
   */
  private autoOpen(): void {
    if (this.sections.hasBeenOpened(this.sectionId) || this.hasUnopenedPredecessor()) {
      return;
    }
    this.sections.open(this.sectionId);
  }

  private hasUnopenedPredecessor(): boolean {
    const ids = this.sections.ids();
    return ids
      .slice(0, ids.indexOf(this.sectionId))
      .some(id => !this.sections.hasBeenOpened(id));
  }

  private stopObserving(): void {
    this.stop?.();
    this.stop = undefined;
  }
}
