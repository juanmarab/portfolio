import { Component, inject } from '@angular/core';
import emailjs from 'emailjs-com';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendlyWidgetComponent } from '../shared/calendly-widget/calendly-widget.component';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendlyWidgetComponent
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  public langService = inject(LanguageService);

  public sendEmail(contactForm: NgForm): void {
    if (contactForm.invalid) {
      alert(this.langService.t().contact.alert_validation);
      return;
    }

    const serviceID = 'service_22qqfjs';
    const templateID = 'portfolio_contact';
    const publicKey = 'rf6aulzAHdwFL8Wdw';

    emailjs.send(serviceID, templateID, contactForm.value, publicKey)
      .then(response => {
        console.log('Email sent successfully:', response);
        alert(this.langService.t().contact.alert_success);
        contactForm.reset();
      })
      .catch(error => {
        console.error('Error sending email:', error);
        alert(this.langService.t().contact.alert_error);
      });
  }
}