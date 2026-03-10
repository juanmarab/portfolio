import { Injectable, inject, computed } from '@angular/core';
import { Project } from '../models/project.model';
import { LanguageService } from './language.service';

const PROJECTS_DATA = [
    {
        id: 'guard-ia',
        logo: '/assets/images/guardia-logo.png',
        linkUrl: 'https://github.com/sogliano/guardia',
        techStack: ['Vue 3', 'FastAPI', 'DistilBERT', 'Claude', 'PostgreSQL', 'Docker', 'Cloud Run'],
        es: {
            title: 'Guard-IA (Proyecto Final - Universidad ORT)',
            subtitle: 'Sistema de Prevención de Fraude Digital con IA',
            period: '2025 - 2026',
            achievements: [
                { label: 'El Desafío', text: 'Mitigar la creciente amenaza del spear-phishing impulsado por IA y ataques automatizados dirigidos a entornos corporativos.' },
                { label: 'La Solución', text: 'Desarrollo de un middleware de seguridad de alto rendimiento (patrocinado por Strike) integrado con Google Workspace, con un pipeline de detección híbrido (Heurística + ML + LLM) para el análisis en tiempo real.' },
                { label: 'Rendimiento', text: 'Recall del 99.57% utilizando un modelo DistilBERT fine-tuned con una latencia de inferencia de 18ms, complementado con explicabilidad estructurada mediante Claude 3.5 Sonnet.' }
            ]
        },
        en: {
            title: 'Guard-IA (Final Project - ORT University)',
            subtitle: 'AI-Powered Digital Fraud Prevention System',
            period: '2025 - 2026',
            achievements: [
                { label: 'The Challenge', text: 'Mitigate the growing threat of AI-driven spear-phishing and automated attacks aimed at corporate environments.' },
                { label: 'The Solution', text: 'Developed a high-performance security middleware (sponsored by Strike) integrated with Google Workspace, featuring a hybrid detection pipeline (Heuristics + ML + LLM) for real-time analysis.' },
                { label: 'Performance', text: '99.57% Recall using a fine-tuned DistilBERT model with 18ms inference latency, complemented by structured explainability via Claude 3.5 Sonnet.' }
            ]
        }
    },
    {
        id: 'crypto-bot',
        logo: 'https://revolucionatupyme.com/wp-content/uploads/2024/08/Make-logo-1024x264.png',
        linkUrl: 'https://github.com/juanmarab/crypto-trading-bot.git',
        techStack: ['Make', 'n8n', 'Webhooks', 'REST APIs', 'JSON'],
        es: {
            title: 'Automatización & Rastreo de Crypto Activos',
            subtitle: 'Herramienta Privada de Análisis de Trading',
            period: 'Proyecto Personal',
            achievements: [
                { label: 'El Desafío', text: 'Necesidad de un sistema reactivo en tiempo real para rastrear y gestionar posiciones de trading apalancadas y stop-losses.' },
                { label: 'La Solución', text: 'Construcción de un flujo de automatización robusto utilizando n8n/Make para ingestar webhooks indicadores de mercado y registrar rendimientos.' }
            ]
        },
        en: {
            title: 'Crypto Asset Tracking & Automation',
            subtitle: 'Private Trading Analysis Tool',
            period: 'Personal Project',
            achievements: [
                { label: 'The Challenge', text: 'Need for a reactive real-time system to track and manage leveraged trading positions and stop-losses.' },
                { label: 'The Solution', text: 'Built a robust automation workflow using n8n/Make to ingest market indicator webhooks and log performance.' }
            ]
        }
    },
    {
        id: 'portfolio',
        logo: 'https://angular.io/assets/images/logos/angular/angular.png',
        linkUrl: 'https://github.com/juanmarab/portfolio.git',
        techStack: ['Angular 19', 'TypeScript', 'CSS3', 'GitHub Actions'],
        es: {
            title: 'Portfolio UI/UX Premium',
            subtitle: 'Arquitectura SPA Optimizada',
            period: 'Proyecto Continuo',
            achievements: [
                { label: 'El Desafío', text: 'Construir una plataforma personal escalable, altamente profesional y segura desde los cimientos.' },
                { label: 'La Solución', text: 'Diseño e implementación de una Single Page Application utilizando Standalone Components de Angular 19, CSS Variables para theming y despliegue automatizado.' }
            ]
        },
        en: {
            title: 'Premium UI/UX Portfolio',
            subtitle: 'Optimized SPA Architecture',
            period: 'Ongoing Project',
            achievements: [
                { label: 'The Challenge', text: 'Build a scalable, highly professional, and intrinsically secure personal platform.' },
                { label: 'The Solution', text: 'Designed and implemented a Single Page Application using Angular 19 Standalone Components, CSS Variables for theming, and automated deployments.' }
            ]
        }
    }
];

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
