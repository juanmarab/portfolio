import { Injectable, signal } from '@angular/core';
import { en } from '../translations/en';
import { es } from '../translations/es';

export type SupportedLanguage = 'en' | 'es';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    // By default, English is used
    private currentLanguage = signal<SupportedLanguage>('en');

    // Translations object
    public t = signal(en);

    constructor() {
        // Optionally check local storage for saved preference
        const savedLang = localStorage.getItem('app_lang');
        if (savedLang === 'es' || savedLang === 'en') {
            this.setLanguage(savedLang);
        } else {
            // Sync default lang to document for SEO/a11y even without saved preference
            this.syncDocumentLang('en');
        }
    }

    get currentLang() {
        return this.currentLanguage();
    }

    setLanguage(lang: SupportedLanguage) {
        this.currentLanguage.set(lang);
        this.t.set(lang === 'es' ? es : en);
        this.syncDocumentLang(lang);
        localStorage.setItem('app_lang', lang);
    }

    toggleLanguage() {
        this.setLanguage(this.currentLanguage() === 'en' ? 'es' : 'en');
    }

    private syncDocumentLang(lang: SupportedLanguage): void {
        if (typeof document !== 'undefined' && document.documentElement) {
            document.documentElement.lang = lang;
        }
    }
}
