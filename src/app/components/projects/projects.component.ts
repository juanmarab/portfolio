import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProjectsComponent {
  private projectService = inject(ProjectService);
  public langService = inject(LanguageService);

  public projectsList = this.projectService.projectsList;
}