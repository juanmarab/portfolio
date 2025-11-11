import { Component } from '@angular/core';
import emailjs from 'emailjs-com';
import { FormsModule, NgForm } from '@angular/forms'; // <-- 1. Importar FormsModule y NgForm
import { CommonModule } from '@angular/common'; // <-- 2. Importar CommonModule para *ngIf

@Component({
  selector: 'app-contact',
  standalone: true, // <-- 3. Marcado como Standalone
  imports: [
    CommonModule, // <-- 4. Añadir CommonModule
    FormsModule   // <-- 5. Añadir FormsModule
  ],
  templateUrl: './contact.component.html'
  // No hay 'styleUrls'
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

    // 8. Enviar 'contactForm.value' es más limpio y funciona perfecto
    emailjs.send(serviceID, templateID, contactForm.value, publicKey)
      .then(response => {
        console.log('Correo enviado exitosamente:', response);
        alert('Correo enviado exitosamente'); // <-- Reemplazar 'alert' con un modal es un buen próximo paso
        contactForm.reset(); // <-- Resetea el formulario
      })
      .catch(error => {
        console.error('Error al enviar correo:', error);
        alert('Error al enviar el correo');
      });
  }
}