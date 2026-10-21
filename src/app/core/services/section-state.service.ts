import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SectionStateService {
    private order = signal<readonly string[]>([]);
    private openState = signal<Record<string, boolean>>({});
    private openedState = signal<Record<string, boolean>>({});
    private instantFlag = signal(false);
    private pendingFrame: number | null = null;

    /** True for two frames after openUpTo, so sections can skip their height transition. */
    readonly instant = this.instantFlag.asReadonly();

    register(id: string): void {
        if (!this.order().includes(id)) {
            this.order.update(order => [...order, id]);
        }
    }

    ids(): readonly string[] {
        return this.order();
    }

    isOpen(id: string): boolean {
        return this.openState()[id] ?? false;
    }

    hasBeenOpened(id: string): boolean {
        return this.openedState()[id] ?? false;
    }

    open(id: string): void {
        this.openAll([id]);
    }

    close(id: string): void {
        this.openState.update(state => ({ ...state, [id]: false }));
    }

    toggle(id: string): void {
        if (this.isOpen(id)) {
            this.close(id);
        } else {
            this.open(id);
        }
    }

    openUpTo(id: string): void {
        const index = this.order().indexOf(id);
        if (index === -1) {
            return;
        }

        this.instantFlag.set(true);
        this.openAll(this.order().slice(0, index + 1));
        this.scheduleInstantReset();
    }

    /**
     * Clears `instant` after two frames. A single frame runs before the browser has
     * styled the no-transition state, so it would only see the net change and animate.
     * Only the latest call's reset survives; an earlier pending one is cancelled.
     */
    private scheduleInstantReset(): void {
        if (this.pendingFrame !== null) {
            cancelAnimationFrame(this.pendingFrame);
        }
        this.pendingFrame = requestAnimationFrame(() => {
            this.pendingFrame = requestAnimationFrame(() => {
                this.pendingFrame = null;
                this.instantFlag.set(false);
            });
        });
    }

    private openAll(ids: readonly string[]): void {
        const flags = Object.fromEntries(ids.map(id => [id, true]));
        this.openState.update(state => ({ ...state, ...flags }));
        this.openedState.update(state => ({ ...state, ...flags }));
    }
}
