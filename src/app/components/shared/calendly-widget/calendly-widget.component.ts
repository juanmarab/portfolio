import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calendly-widget',
  standalone: true,
  imports: [],
  template: `
    <div #container class="calendly-inline-widget" style="min-width:320px; height:700px;">
    </div>
  `,
})
export class CalendlyWidgetComponent implements AfterViewInit {
  @Input() calendlyUrl: string = '';
  @ViewChild('container') container!: ElementRef;

  ngAfterViewInit() {
    this.checkAndInitCalendly();
  }

  private checkAndInitCalendly() {
    // @ts-ignore
    if (window.Calendly) {
      this.initCalendly();
    } else {
      setTimeout(() => this.checkAndInitCalendly(), 200);
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