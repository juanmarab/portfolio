import { Injectable, inject } from '@angular/core';

import { prefersReducedMotion } from '../utils/motion';
import { SectionStateService } from './section-state.service';

/** Height in px of the fixed header that must not cover the scroll target. */
export const HEADER_OFFSET = 80;

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    private sections = inject(SectionStateService);

    /** Opens every collapsible section up to `id`, then scrolls to it once the layout has updated. */
    goTo(id: string): void {
        this.sections.openUpTo(id);

        requestAnimationFrame(() => {
            const el = document.getElementById(id);
            if (!el) {
                return;
            }

            window.scrollTo({
                top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
                behavior: prefersReducedMotion() ? 'auto' : 'smooth'
            });
        });
    }
}
