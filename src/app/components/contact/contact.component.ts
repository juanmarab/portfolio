import { Component } from '@angular/core';
import emailjs from 'emailjs-com';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendlyWidgetComponent } from '../shared/calendly-widget/calendly-widget.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendlyWidgetComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  public sendEmail(contactForm: NgForm): void { 
    if (contactForm.invalid) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const serviceID = 'service_22qqfjs'; // Tu Service ID
    const templateID = 'portfolio_contact'; // Tu Template ID
    const publicKey = 'rf6aulzAHdwFL8Wdw'; // Tu Public Key

    emailjs.send(serviceID, templateID, contactForm.value, publicKey)
      .then(response => {
        console.log('Email send successfully:', response);
        alert('Email send successfully'); // <-- Reemplazar 'alert' con un modal es un buen próximo paso
        contactForm.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error');
      });
  }
}