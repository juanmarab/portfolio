import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendly-widget',
  standalone: true,
  imports: [],

  template: `
    <div class="calendly-inline-widget" 
         [attr.data-url]="calendlyUrl" 
         style="min-width:320px; height:700px;">
    </div>
  `,
  
})
export class CalendlyWidgetComponent {

  @Input() calendlyUrl: string = '';

}