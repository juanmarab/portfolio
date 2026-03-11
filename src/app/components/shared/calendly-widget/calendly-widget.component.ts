import { Component, Input, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calendly-widget',
  standalone: true,
  imports: [],
  template: `
    <div #container style="min-width: 100%; height:700px; width: 100%;">
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class CalendlyWidgetComponent implements AfterViewInit, OnDestroy {
  @Input() calendlyUrl: string = '';
  @ViewChild('container') container!: ElementRef;
  private timeoutId: any;

  ngAfterViewInit() {
    this.checkAndInitCalendly();
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private checkAndInitCalendly() {
    // @ts-ignore
    if (window.Calendly) {
      this.initCalendly();
    } else {
      this.timeoutId = setTimeout(() => this.checkAndInitCalendly(), 200);
    }
  }

  private initCalendly() {
    // @ts-ignore
    window.Calendly.initInlineWidget({
      url: this.calendlyUrl,
      parentElement: this.container.nativeElement
    });
  }
}