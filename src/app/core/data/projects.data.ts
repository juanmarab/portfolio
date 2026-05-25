interface ProjectLocalized {
    title: string;
    subtitle: string;
    period: string;
    achievements: { label: string; text: string }[];
}

export interface ProjectRecord {
    id: string;
    logo: string;
    linkUrl: string;
    techStack: string[];
    es: ProjectLocalized;
    en: ProjectLocalized;
}

export const PROJECTS_DATA: ProjectRecord[] = [
    {
        id: 'guard-ia',
        logo: 'assets/images/guardia-logo.png',
        linkUrl: 'https://github.com/sogliano/guardia',
        techStack: ['Vue 3', 'FastAPI', 'DistilBERT', 'Claude', 'PostgreSQL', 'Docker', 'Cloud Run'],
        es: {
            title: 'Guard-IA (Proyecto Final - Universidad ORT)',
            subtitle: 'Sistema de Prevención de Fraude Digital con IA y Machine Learning',
            period: '2025 - 2026',
            achievements: [
                { label: 'El Desafío', text: 'Mitigar la creciente amenaza del spear-phishing impulsado por IA y ataques automatizados dirigidos a entornos corporativos.' },
                { label: 'La Solución', text: 'Desarrollo de un middleware de seguridad de alto rendimiento (patrocinado por Strike) integrado con Google Workspace, con un pipeline de detección híbrido (Heurística + ML + LLM) para el análisis en tiempo real.' },
                { label: 'Rendimiento', text: 'Recall del 94% utilizando un modelo DistilBERT fine-tuned con una latencia de inferencia de 18ms, complementado con explicabilidad estructurada mediante Claude 3.5 Sonnet.' },
                { label: 'Calificación del Proyecto', text: 'Proyecto final de la carrera con una calificación de 97%.' }
            ]
        },
        en: {
            title: 'Guard-IA (Final Project - ORT University)',
            subtitle: 'AI and Machine Learning Powered Digital Fraud Prevention System ',
            period: '2025 - 2026',
            achievements: [
                { label: 'The Challenge', text: 'Mitigate the growing threat of AI-driven spear-phishing and automated attacks aimed at corporate environments.' },
                { label: 'The Solution', text: 'Developed a high-performance security middleware (sponsored by Strike) integrated with Google Workspace, featuring a hybrid detection pipeline (Heuristics + ML + LLM) for real-time analysis.' },
                { label: 'Performance', text: '94% Recall using a fine-tuned DistilBERT model with 18ms inference latency, complemented by structured explainability via Claude 3.5 Sonnet.' },
                { label: 'Project Rating', text: 'Final project of the degree with a rating of 97%.' }
            ]
        }
    },
    {
    id: 'crypto-trading-agent',
    logo: 'assets/images/crypto-trading-agent-logo.png',
    linkUrl: 'https://github.com/juanmarab/crypto-trading-agent',
    techStack: ['.NET 8', 'React 19', 'TypeScript', 'ML.NET 3.0', 'PostgreSQL + pgvector', 'Groq / Gemini', 'Kraken API', 'Docker', 'Northflank', 'Vercel'],
    es: {
        title: 'Crypto Trading Agent',
        subtitle: 'Agente de trading cripto con razonamiento híbrido (TA + RAG + ML) y LLM como árbitro final',
        period: '2026',
        achievements: [
            { label: 'El Desafío', text: 'Replicar el flujo de decisión multi-modelo que usan las mesas institucionales — fusionando análisis técnico, contexto macro/noticias y predicción cuantitativa — en una arquitectura desplegable 24/7 sobre infraestructura 100% gratuita.' },
            { label: 'La Solución', text: 'Backend .NET 8 por capas (Domain / Application / Infrastructure / API / ML) con tres motores de razonamiento que convergen en cada decisión: Lógico (indicadores TA sobre WebSocket de Kraken), Semántico (RAG con embeddings de noticias en pgvector) y Estadístico (ML.NET in-process con OneVsAll FastTree). Un LLM (cadena Groq → Gemini → Mock) emite el veredicto final y debe justificar explícitamente su acuerdo o desacuerdo con la predicción del modelo ML.' },
            { label: 'Rendimiento e Ingeniería', text: '292 tests con 85% de cobertura de línea (gate del 80% bloquea el merge), 7 workers en background, alertas Telegram con tokens cifrados en reposo vía ASP.NET Data Protection, y migración Binance → Kraken resuelta en 1 sprint para sortear el geobloqueo US-Central de producción.' },
            { label: 'Despliegue', text: 'En producción 24/7 sobre stack free-tier auditado (Vercel + Northflank + Supabase) con CI/CD en GitHub Actions: dotnet format + build + test + gate de cobertura + lint y build del frontend en cada push.' }
        ]
    },
    en: {
        title: 'Crypto Trading Agent',
        subtitle: 'Crypto trading agent with hybrid reasoning (TA + RAG + ML) and an LLM as the final arbiter',
        period: '2026',
        achievements: [
            { label: 'The Challenge', text: 'Replicate the multi-model decision flow used by institutional desks — fusing technical analysis, macro/news context, and quantitative prediction — in an architecture deployable 24/7 on a 100% free-tier infrastructure.' },
            { label: 'The Solution', text: 'Layered .NET 8 backend (Domain / Application / Infrastructure / API / ML) with three reasoning engines converging on every decision: Logical (TA indicators over Kraken WebSocket), Semantic (RAG over news embeddings in pgvector), and Statistical (in-process ML.NET with OneVsAll FastTree). An LLM (Groq → Gemini → Mock fallback chain) issues the final verdict and must explicitly justify its agreement or disagreement with the ML model prior.' },
            { label: 'Performance & Engineering', text: '292 tests at 85% line coverage (80% gate blocks merge), 7 background workers, Telegram alerts with bot tokens encrypted at rest via ASP.NET Data Protection, and a Binance → Kraken migration shipped in one sprint to bypass production US-Central geo-blocking.' },
            { label: 'Deployment', text: 'Live 24/7 on an audited free-tier stack (Vercel + Northflank + Supabase) with full CI/CD on GitHub Actions: dotnet format + build + test + coverage gate, plus frontend lint and build on every push.' }
        ]
    }
    },
    {
        id: 'portfolio',
        logo: 'assets/icons/angular.svg',
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
    }
];
