import { Injectable } from '@angular/core';

export interface ObserveOptions {
    rootMargin?: string;
    threshold?: number;
}

interface ObserverEntry {
    observer: IntersectionObserver;
    listeners: Map<Element, Set<() => void>>;
}

const DEFAULT_ROOT_MARGIN = '0px 0px -8% 0px';
const DEFAULT_THRESHOLD = 0.15;

@Injectable({
    providedIn: 'root'
})
export class RevealObserverService {
    private entries = new Map<string, ObserverEntry>();

    observe(el: Element, onVisible: () => void, options: ObserveOptions = {}): () => void {
        if (typeof IntersectionObserver === 'undefined') {
            onVisible();
            return () => {};
        }

        const { observer, listeners } = this.getEntry(
            options.rootMargin ?? DEFAULT_ROOT_MARGIN,
            options.threshold ?? DEFAULT_THRESHOLD
        );

        // A fresh closure per call keeps each subscription's identity unique,
        // even when the same element or the same function is observed twice.
        const listener = () => onVisible();
        const forElement = listeners.get(el) ?? new Set<() => void>();
        forElement.add(listener);
        listeners.set(el, forElement);
        observer.observe(el);

        return () => {
            if (!forElement.delete(listener) || forElement.size > 0) {
                return;
            }
            listeners.delete(el);
            observer.unobserve(el);
        };
    }

    private getEntry(rootMargin: string, threshold: number): ObserverEntry {
        const key = `${rootMargin}|${threshold}`;
        let entry = this.entries.get(key);
        if (!entry) {
            const listeners = new Map<Element, Set<() => void>>();
            const observer = new IntersectionObserver(observed => {
                for (const { target, isIntersecting } of observed) {
                    if (isIntersecting) {
                        listeners.get(target)?.forEach(listener => listener());
                    }
                }
            }, { rootMargin, threshold });
            entry = { observer, listeners };
            this.entries.set(key, entry);
        }
        return entry;
    }
}
