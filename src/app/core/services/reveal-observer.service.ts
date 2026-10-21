import { Injectable } from '@angular/core';

export interface ObserveOptions {
    rootMargin?: string;
    threshold?: number;
}

const DEFAULT_ROOT_MARGIN = '0px 0px -8% 0px';
const DEFAULT_THRESHOLD = 0.15;

@Injectable({
    providedIn: 'root'
})
export class RevealObserverService {
    private observers = new Map<string, IntersectionObserver>();
    private callbacks = new Map<Element, () => void>();

    observe(el: Element, onVisible: () => void, options: ObserveOptions = {}): () => void {
        if (typeof IntersectionObserver === 'undefined') {
            onVisible();
            return () => {};
        }

        const observer = this.getObserver(
            options.rootMargin ?? DEFAULT_ROOT_MARGIN,
            options.threshold ?? DEFAULT_THRESHOLD
        );
        this.callbacks.set(el, onVisible);
        observer.observe(el);

        return () => {
            observer.unobserve(el);
            this.callbacks.delete(el);
        };
    }

    private getObserver(rootMargin: string, threshold: number): IntersectionObserver {
        const key = `${rootMargin}|${threshold}`;
        let observer = this.observers.get(key);
        if (!observer) {
            observer = new IntersectionObserver(entries => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        this.callbacks.get(entry.target)?.();
                    }
                }
            }, { rootMargin, threshold });
            this.observers.set(key, observer);
        }
        return observer;
    }
}
