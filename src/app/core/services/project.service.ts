import { Injectable, inject, computed } from '@angular/core';
import { Project } from '../models/project.model';
import { LanguageService } from './language.service';
import { PROJECTS_DATA } from '../data/projects.data';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private langService = inject(LanguageService);

    public projectsList = computed<Project[]>(() => {
        const lang = this.langService.currentLang as 'es' | 'en';
        return PROJECTS_DATA.map(proj => ({
            id: proj.id,
            logo: proj.logo,
            linkUrl: proj.linkUrl,
            techStack: proj.techStack,
            title: proj[lang].title,
            subtitle: proj[lang].subtitle,
            period: proj[lang].period,
            achievements: proj[lang].achievements
        }));
    });
}
