interface EducationLocalized {
    degree: string;
    achievements: string[];
}

export interface EducationRecord {
    id: string;
    logo: string;
    institution: string;
    period: string;
    es: EducationLocalized;
    en: EducationLocalized;
}

export const EDUCATION_DATA: EducationRecord[] = [
    {
        id: 'licenciatura-sistemas',
        logo: 'assets/images/education/ort.png',
        institution: 'Universidad ORT Uruguay',
        period: '2019 - 2026',
        es: {
            degree: 'Licenciatura en Sistemas',
            achievements: [
                'Cursando el último año de la Licenciatura en Sistemas, con un fuerte enfoque en ingeniería de software, arquitectura de sistemas y tecnologías modernas.',
                'Desarrollo de habilidades avanzadas en resolución de problemas técnicos complejos a través de proyectos prácticos orientados al mundo empresarial.',
                'Sólida experiencia en metodologías ágiles, liderazgo técnico y colaboración en equipos multidisciplinarios para la entrega continua de valor.'
            ]
        },
        en: {
            degree: 'Bachelor in Systems Engineering',
            achievements: [
                'Currently in the final year of the Systems Engineering program, with a strong focus on software engineering, systems architecture, and modern technologies.',
                'Developing advanced skills in complex technical problem solving through practical, enterprise-oriented projects.',
                'Solid experience in agile methodologies, technical leadership, and multidisciplinary team collaboration for continuous value delivery.'
            ]
        }
    },
    {
        id: 'bachillerato-informatico',
        logo: 'assets/images/education/utu.png',
        institution: 'DGETP - UTU, Uruguay',
        period: '2015 - 2018',
        es: {
            degree: 'Bachiller Tecnológico en Informática',
            achievements: [
                'Programa técnico intensivo enfocado en los fundamentos de la computación, arquitectura de hardware y programación desde las bases.',
                'Adquisición de habilidades matemáticas y lógicas esenciales, además del dominio de algoritmos y estructuras de datos fundamentales.',
                'Desarrollo de una base técnica sólida como pilar para la ingeniería de software de alto nivel.'
            ]
        },
        en: {
            degree: 'Technical Bachelor in Computer Science',
            achievements: [
                'Intensive technical program focused on the fundamentals of computing, hardware architecture, and programming from the ground up.',
                'Acquisition of essential mathematical and logical skills, alongside mastery of core algorithms and data structures.',
                'Development of a solid technical foundation as a pillar for high-level software engineering.'
            ]
        }
    }
];
