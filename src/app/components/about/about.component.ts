import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor
import { InfoCardComponent } from '../shared/info-card/info-card.component'; // (Ajusta la ruta)

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  
  standalone: true,
  imports: [
    CommonModule,
    InfoCardComponent
  ]
})
export class AboutComponent {

  
}