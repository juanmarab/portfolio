import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css'],
  imports: [CommonModule],
})
export class InfoCardComponent {

  @Input() logo?: string;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() dates: string = '';
  @Input() points: string[] = [];
  @Input() mode: 'light' | 'dark' = 'light';
  @Input() linkUrl?: string;
  @Input() linkText: string = 'Open the repository';
  constructor() { }
}