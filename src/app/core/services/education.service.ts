import { Injectable, inject, computed } from '@angular/core';
import { Education } from '../models/education.model';
import { LanguageService } from './language.service';

@Injectable({
    providedIn: 'root'
})
export class EducationService {
    private langService = inject(LanguageService);

    public educationHistory = computed<Education[]>(() => {
        const lang = this.langService.currentLang;

        if (lang === 'es') {
            return [
                {
                    id: 'licenciatura-sistemas',
                    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMh6i2GJOjC6DpnfI0rju0zGL9dVVsNH2BGA&s',
                    degree: 'Licenciatura en Sistemas',
                    institution: 'Universidad ORT Uruguay',
                    period: '2019 - 2026',
                    achievements: [
                        'Cursando el último año de la Licenciatura en Sistemas, con un fuerte enfoque en ingeniería de software, arquitectura de sistemas y tecnologías modernas.',
                        'Desarrollo de habilidades avanzadas en resolución de problemas técnicos complejos a través de proyectos prácticos orientados al mundo empresarial.',
                        'Sólida experiencia en metodologías ágiles, liderazgo técnico y colaboración en equipos multidisciplinarios para la entrega continua de valor.'
                    ]
                },
                {
                    id: 'bachillerato-informatico',
                    logo: 'https://www2.utu.edu.uy/wp-content/uploads/2025/04/Logotipo-DGETP-Vertical-fondo-sobre-color-2.png',
                    degree: 'Bachiller Tecnológico en Informática',
                    institution: 'DGETP - UTU, Uruguay',
                    period: '2015 - 2018',
                    achievements: [
                        'Programa técnico intensivo enfocado en los fundamentos de la computación, arquitectura de hardware y programación desde las bases.',
                        'Adquisición de habilidades matemáticas y lógicas esenciales, además del dominio de algoritmos y estructuras de datos fundamentales.',
                        'Desarrollo de una base técnica sólida como pilar para la ingeniería de software de alto nivel.'
                    ]
                }
            ];
        } else {
            return [
                {
                    id: 'licenciatura-sistemas',
                    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMh6i2GJOjC6DpnfI0rju0zGL9dVVsNH2BGA&s',
                    degree: 'Bachelor in Systems Engineering',
                    institution: 'Universidad ORT Uruguay',
                    period: '2019 - 2026',
                    achievements: [
                        'Currently in the final year of the Systems Engineering program, with a strong focus on software engineering, systems architecture, and modern technologies.',
                        'Developing advanced skills in complex technical problem solving through practical, enterprise-oriented projects.',
                        'Solid experience in agile methodologies, technical leadership, and multidisciplinary team collaboration for continuous value delivery.'
                    ]
                },
                {
                    id: 'bachillerato-informatico',
                    logo: 'https://www2.utu.edu.uy/wp-content/uploads/2025/04/Logotipo-DGETP-Vertical-fondo-sobre-color-2.png',
                    degree: 'Technical Bachelor in Computer Science',
                    institution: 'DGETP - UTU, Uruguay',
                    period: '2015 - 2018',
                    achievements: [
                        'Intensive technical program focused on the fundamentals of computing, hardware architecture, and programming from the ground up.',
                        'Acquisition of essential mathematical and logical skills, alongside mastery of core algorithms and data structures.',
                        'Development of a solid technical foundation as a pillar for high-level software engineering.'
                    ]
                }
            ];
        }
    });
}
