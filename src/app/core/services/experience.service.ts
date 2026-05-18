import { Injectable, inject, computed } from '@angular/core';
import { Experience } from '../models/experience.model';
import { LanguageService } from './language.service';
import { EXPERIENCE_DATA } from '../data/experience.data';

@Injectable({
    providedIn: 'root'
})
export class ExperienceService {
    private langService = inject(LanguageService);

    public workHistory = computed<Experience[]>(() => {
        const lang = this.langService.currentLang as 'es' | 'en';
        return EXPERIENCE_DATA.map(exp => ({
            id: exp.id,
            logo: exp.logo,
            companyName: exp.companyName,
            technologies: exp.technologies,
            role: exp[lang].role,
            period: exp[lang].period,
            achievements: exp[lang].achievements
        }));
    });
}
