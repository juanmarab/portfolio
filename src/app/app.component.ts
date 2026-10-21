import { Component, afterNextRender, computed, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SectionShellComponent } from './components/shared/section-shell/section-shell.component';
import { SKILL_CATEGORIES } from './core/data/skills.data';
import { EducationService } from './core/services/education.service';
import { ExperienceService } from './core/services/experience.service';
import { LanguageService } from './core/services/language.service';
import { ProjectService } from './core/services/project.service';
import { ScrollService } from './core/services/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    AboutComponent,
    ProjectsComponent,
    SectionShellComponent
  ]
})
export class AppComponent {
  public langService = inject(LanguageService);

  private scroll = inject(ScrollService);
  private experience = inject(ExperienceService);
  private projects = inject(ProjectService);
  private education = inject(EducationService);

  /** Collapsed-section subtitles ("3 roles"), counted from the data so they never drift. */
  readonly meta = computed(() => {
    const shell = this.langService.t().shell;
    const withCount = (template: string, count: number) => template.replace('{n}', String(count));

    return {
      experience: withCount(shell.experience_meta, this.experience.workHistory().length),
      projects: withCount(shell.projects_meta, this.projects.projectsList().length),
      skills: withCount(shell.skills_meta, SKILL_CATEGORIES.length),
      education: withCount(shell.education_meta, this.education.educationHistory().length)
    };
  });

  constructor() {
    // Runs after the first render so the sections have registered with the state service
    // and flipping their open signals cannot trip ExpressionChangedAfterItHasBeenChecked.
    afterNextRender(() => {
      const id = location.hash.slice(1);
      if (id) {
        this.scroll.goTo(id);
      }
    });
  }
}
