import { Injectable, inject, computed } from '@angular/core';
import { Education } from '../models/education.model';
import { LanguageService } from './language.service';
import { EDUCATION_DATA } from '../data/education.data';

@Injectable({
    providedIn: 'root'
})
export class EducationService {
    private langService = inject(LanguageService);

    public educationHistory = computed<Education[]>(() => {
        const lang = this.langService.currentLang as 'es' | 'en';
        return EDUCATION_DATA.map(edu => ({
            id: edu.id,
            logo: edu.logo,
            institution: edu.institution,
            period: edu.period,
            degree: edu[lang].degree,
            achievements: edu[lang].achievements
        }));
    });
}
