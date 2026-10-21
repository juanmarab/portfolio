interface ExperienceLocalized {
    role: string;
    period: string;
    achievements: string[];
}

export interface ExperienceRecord {
    id: string;
    logo: string;
    companyName: string;
    technologies: string[];
    es: ExperienceLocalized;
    en: ExperienceLocalized;
}

export const EXPERIENCE_DATA: ExperienceRecord[] = [
    {
        id: 'make',
        logo: 'assets/images/companies/make_software_labs_logo.jpg',
        companyName: 'Make Software Labs',
        technologies: ['Java', 'Spring Boot', 'Angular', 'React', 'Python (FastAPI)', 'LLMs (Claude / Bedrock)', 'Computer Vision', 'AWS', 'PostgreSQL / MySQL', 'FHIR / HL7'],
        es: {
            role: 'Full Stack Developer (AI/ML)',
            period: 'Julio 2026 — Presente',
            achievements: [
                'A cargo de las decisiones técnicas y de producto en los proyectos que llevo: defino qué construir y cómo, escribo el diseño y el plan de implementación, y lo desarrollo de punta a punta.',
                'Plataforma SaaS multi-tenant de patología digital (Java/Spring Boot + Angular, AWS): desarrollo funcionalidades para visualizar, anotar y analizar con IA imágenes de láminas completas (WSI), incluidos protocolos oncológicos CAP de mama y próstata con estadificación y graduación automáticas.',
                'Diseñé la generación de informes médicos asistida por IA: plantillas deterministas para el contenido clínico y LLMs (Amazon Bedrock) solo para el texto libre, con trazabilidad de cada frase y des-identificación de los datos de pacientes.',
                'Integré visión por computadora (segmentación celular con HoVer-Net, segmentación interactiva con SAM2 sobre GPU en AWS, lectura de etiquetas con QR + OCR) y la interoperabilidad con laboratorios mediante FHIR R4 y HL7 v2.',
                'Chatbot de analítica en lenguaje natural sobre MySQL (Python/FastAPI + React): definí la evolución del MVP, decidí migrar de un LLM local a Claude (Anthropic) e incorporé autocorrección de SQL, conversaciones persistentes, un modo asesor comercial basado en los datos consultados y controles de seguridad.',
                'Sistema de gestión comercial en Java EE (JSF/PrimeFaces): definí y ejecuté la modernización de la interfaz en todos sus módulos (facturación, campañas, contactos, indicadores) y el rediseño de las facturas PDF.'
            ]
        },
        en: {
            role: 'Full Stack Developer (AI/ML)',
            period: 'July 2026 — Present',
            achievements: [
                'Own the technical and product decisions on the projects I lead: I define what to build and how, write the design and implementation plan, and develop it end to end.',
                'Multi-tenant digital pathology SaaS platform (Java/Spring Boot + Angular, AWS): build features to view, annotate and AI-analyze whole slide images (WSI), including CAP breast and prostate oncology protocols with automatic staging and grading.',
                'Designed AI-assisted medical report generation: deterministic templates for clinical content and LLMs (Amazon Bedrock) only for free text, with sentence-level traceability and patient-data de-identification.',
                'Integrated computer vision (HoVer-Net cell segmentation, interactive SAM2 segmentation on AWS GPUs, QR + OCR slide-label reading) and lab interoperability through FHIR R4 and HL7 v2.',
                'Natural-language analytics chatbot over MySQL (Python/FastAPI + React): drove the MVP\'s evolution, decided to migrate from a local LLM to Claude (Anthropic), and added SQL self-correction, persistent conversations, a data-grounded commercial advisor mode and security controls.',
                'Java EE business management system (JSF/PrimeFaces): defined and delivered the UI modernization across all modules (billing, campaigns, contacts, KPIs) and the redesign of PDF invoices.'
            ]
        }
    },
    {
        id: 'kinamic',
        logo: 'assets/images/companies/kinamic.png',
        companyName: 'Kinamic Technologies',
        technologies: ['C# .NET', 'Angular', 'AWS', 'SQL Server', 'CI/CD', 'Docker', 'Agile/Scrum'],
        es: {
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
        en: {
            role: 'Full Stack Developer',
            period: 'June 2022 — December 2024',
            achievements: [
                'Designed and developed highly scalable web applications for a Fintech client integrating .NET Core and Angular.',
                'Optimized overall application performance by refactoring critical backend queries, drastically reducing read times.',
                'Automated CI/CD pipelines and managed cloud architecture (AWS), ensuring high availability (HA) at all times.',
                'Led the development and integration of front-end modules, significantly improving user experience (UX/UI).',
                'Implemented and maintained comprehensive unit and integration test coverage to guarantee software resilience.'
            ]
        }
    },
    {
        id: 'tcs',
        logo: 'assets/images/companies/tcs.png',
        companyName: 'Tata Consultancy Services',
        technologies: ['Java', 'Spring Boot', 'SQL Server', 'Agile/Scrum', 'Jira'],
        es: {
            role: 'Junior Software Engineer',
            period: 'Junio 2021 — Octubre 2021',
            achievements: [
                'Colaboré activamente en un equipo ágil distribuido globalmente (México, India) para entregar nuevas integraciones en tiempo récord.',
                'Traduje requerimientos complejos de negocio del cliente The Home Depot en especificaciones técnicas precisas y código funcional.',
                'Identifiqué la causa raíz y resolví más de 20 incidencias críticas reportadas sobre una base de código legacy en Java, elevando la estabilidad general del sistema.'
            ]
        },
        en: {
            role: 'Junior Software Engineer',
            period: 'June 2021 — October 2021',
            achievements: [
                'Actively collaborated in a globally distributed agile team (Mexico, India) to deliver new integrations in record time.',
                'Translated complex business requirements for The Home Depot into precise technical specifications and functional code.',
                'Identified the root cause and resolved over 20 critical legacy Java codebase issues, elevating overall system stability.'
            ]
        }
    }
];
