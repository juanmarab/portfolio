import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../core/services/education.service';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  standalone: true,
  imports: [CommonModule, RevealDirective]
})
export class EducationComponent {
  private educationService = inject(EducationService);
  public langService = inject(LanguageService);

  public educationHistory = this.educationService.educationHistory;
}