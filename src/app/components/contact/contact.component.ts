import { Component } from '@angular/core';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  public sendEmail(event: any): void {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    const serviceID = 'service_22qqfjs'; // Tu Service ID
    const templateID = 'portfolio_contact'; // Tu Template ID
    const publicKey = 'rf6aulzAHdwFL8Wdw'; // Tu Public Key

    // Recolecta los datos del formulario
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;

    // Enviar correo con EmailJS
    emailjs.send(serviceID, templateID, {
      name: name,
      email: email,
      message: message,
    }, publicKey)
      .then(response => {
        console.log('Correo enviado exitosamente:', response);
        alert('Correo enviado exitosamente');
      })
      .catch(error => {
        console.error('Error al enviar correo:', error);
        alert('Error al enviar el correo');
      });
  }
}
