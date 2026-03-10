import { Injectable, inject, computed } from '@angular/core';
import { Experience } from '../models/experience.model';
import { LanguageService } from './language.service';

@Injectable({
    providedIn: 'root'
})
export class ExperienceService {
    private langService = inject(LanguageService);

    public workHistory = computed<Experience[]>(() => {
        const lang = this.langService.currentLang;

        if (lang === 'es') {
            return [
                {
                    id: 'kinamic',
                    logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQFUGqLt38qgNQ/company-logo_200_200/company-logo_200_200/0/1694700941219/kinamic_logo?e=2147483647&v=beta&t=Kvtxyg65LvnuqhsLpZXjRhUYu6nZ5-dhKAK-J1KeoUk',
                    companyName: 'Kinamic Technologies',
                    role: 'Full Stack Developer',
                    period: 'Junio 2022 — Diciembre 2024',
                    achievements: [
                        'Diseñé y desarrollé aplicaciones web altamente escalables para un cliente Fintech integrando .NET Core y Angular.',
                        'Optimicé el rendimiento general de la aplicación refactorizando consultas críticas en el backend, reduciendo drásticamente los tiempos de lectura.',
                        'Automaticé pipelines de CI/CD y gestioné arquitectura en la nube (AWS), asegurando alta disponibilidad (HA) en todo momento.',
                        'Lideré el desarrollo e integración de los módulos front-end, mejorando significativamente la experiencia de usuario (UX/UI).',
                        'Implementé y mantuve una cobertura exhaustiva de pruebas unitarias e integrales para garantizar la resiliencia del software.'
                    ]
                },
                {
                    id: 'tcs',
                    logo: 'https://discover.give.do/static/img/logos/19WJ/9aad65c4-4ada-437d-a056-cd099c1e88ef.png',
                    companyName: 'Tata Consultancy Services',
                    role: 'Junior Software Engineer',
                    period: 'Junio 2021 — Octubre 2021',
                    achievements: [
                        'Colaboré activamente en un equipo ágil distribuido globalmente (México, India) para entregar nuevas integraciones en tiempo récord.',
                        'Traduje requerimientos complejos de negocio del cliente The Home Depot en especificaciones técnicas precisas y código funcional.',
                        'Identifiqué la causa raíz y resolví más de 20 incidencias críticas reportadas sobre una base de código legacy en Java, elevando la estabilidad general del sistema.'
                    ]
                }
            ];
        } else {
            return [
                {
                    id: 'kinamic',
                    logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQFUGqLt38qgNQ/company-logo_200_200/company-logo_200_200/0/1694700941219/kinamic_logo?e=2147483647&v=beta&t=Kvtxyg65LvnuqhsLpZXjRhUYu6nZ5-dhKAK-J1KeoUk',
                    companyName: 'Kinamic Technologies',
                    role: 'Full Stack Developer',
                    period: 'June 2022 — December 2024',
                    achievements: [
                        'Designed and developed highly scalable web applications for a Fintech client integrating .NET Core and Angular.',
                        'Optimized overall application performance by refactoring critical backend queries, drastically reducing read times.',
                        'Automated CI/CD pipelines and managed cloud architecture (AWS), ensuring high availability (HA) at all times.',
                        'Led the development and integration of front-end modules, significantly improving user experience (UX/UI).',
                        'Implemented and maintained comprehensive unit and integration test coverage to guarantee software resilience.'
                    ]
                },
                {
                    id: 'tcs',
                    logo: 'https://discover.give.do/static/img/logos/19WJ/9aad65c4-4ada-437d-a056-cd099c1e88ef.png',
                    companyName: 'Tata Consultancy Services',
                    role: 'Junior Software Engineer',
                    period: 'June 2021 — October 2021',
                    achievements: [
                        'Actively collaborated in a globally distributed agile team (Mexico, India) to deliver new integrations in record time.',
                        'Translated complex business requirements for The Home Depot into precise technical specifications and functional code.',
                        'Identified the root cause and resolved over 20 critical legacy Java codebase issues, elevating overall system stability.'
                    ]
                }
            ];
        }
    });
}
