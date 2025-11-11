import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css'],
  imports: [CommonModule],
})
export class InfoCardComponent {

  @Input() logo?: string; // URL de la imagen (opcional)
  @Input() title: string = ''; // Título (ej. "Kinamic Technologies")
  @Input() subtitle: string = ''; // Subtítulo (ej. "Full Stack Developer")
  @Input() dates: string = ''; // Rango de fechas
  @Input() points: string[] = []; // Array de strings para los bullet points
  @Input() mode: 'light' | 'dark' = 'light';
  constructor() { }
}