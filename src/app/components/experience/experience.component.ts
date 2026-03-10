import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ExperienceService } from '../../core/services/experience.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ExperienceComponent {
  private experienceService = inject(ExperienceService);
  public langService = inject(LanguageService);

  public workHistory = this.experienceService.workHistory;
}