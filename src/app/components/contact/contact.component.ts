import { Component, inject, signal } from '@angular/core';
import emailjs from 'emailjs-com';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendlyWidgetComponent } from '../shared/calendly-widget/calendly-widget.component';
import { IconComponent } from '../shared/icon/icon.component';
import { LanguageService } from '../../core/services/language.service';
import { RevealDirective } from '../../core/directives/reveal.directive';

export type ContactStatus = 'idle' | 'sending' | 'sent' | 'error' | 'invalid';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendlyWidgetComponent,
    IconComponent,
    RevealDirective
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  public langService = inject(LanguageService);

  /** Inline form feedback; replaces the old alert() dialogs. */
  public status = signal<ContactStatus>('idle');

  public statusMessage(): string {
    const t = this.langService.t().contact;
    switch (this.status()) {
      case 'invalid': return t.alert_validation;
      case 'sending': return t.sending;
      case 'sent': return t.alert_success;
      case 'error': return t.alert_error;
      default: return '';
    }
  }

  public async sendEmail(contactForm: NgForm): Promise<void> {
    if (this.status() === 'sending') {
      return;
    }
    if (contactForm.invalid) {
      this.status.set('invalid');
      return;
    }

    const serviceID = 'service_22qqfjs';
    const templateID = 'portfolio_contact';
    const publicKey = 'rf6aulzAHdwFL8Wdw';

    this.status.set('sending');
    try {
      await emailjs.send(serviceID, templateID, contactForm.value, publicKey);
      this.status.set('sent');
      contactForm.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      this.status.set('error');
    }
  }
}
