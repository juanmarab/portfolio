interface ProjectLocalized {
    title: string;
    subtitle: string;
    period: string;
    achievements: { label: string; text: string }[];
}

export interface ProjectRecord {
    id: string;
    logo: string;
    linkUrl?: string;
    inProgress?: boolean;
    techStack: string[];
    es: ProjectLocalized;
    en: ProjectLocalized;
}

export const PROJECTS_DATA: ProjectRecord[] = [
    {
        id: 'health-sial',
        logo: 'assets/images/sial-logo.png',
        inProgress: true,
        techStack: ['Angular 17', 'ASP.NET Core 8', 'PostgreSQL 16', 'AWS', 'Terraform', 'Docker', 'Clerk'],
        es: {
            title: 'SIAL',
            subtitle: 'SaaS multi-tenant de salud ocupacional para Uruguay · Fundador y CEO',
            period: '2026 — Presente',
            achievements: [
                { label: 'El Desafío', text: 'Centralizar la salud ocupacional de empresas con personal expuesto a riesgos laborales: historias clínicas médico-laborales, exámenes, matriz de riesgos, incidentes, ausentismo, documentación y alertas de cumplimiento, bajo la Ley 18.331 de protección de datos.' },
                { label: 'La Solución', text: 'Producto propio construido de punta a punta: Angular 17 (standalone, signals) + ASP.NET Core 8 con Clean Architecture y MediatR + PostgreSQL 16 con cifrado pgcrypto y Row-Level Security por tenant. RBAC con 9 roles y auditoría inmutable con cadena de hash SHA-256.' },
                { label: 'Infraestructura', text: 'En producción en AWS sa-east-1 con Terraform: EC2 con Docker Compose y Caddy, RDS, S3, ECR, SSM Parameter Store y CloudWatch. Autenticación con Clerk.' },
                { label: 'Estado', text: 'Producto activo en evolución continua: historia clínica maestra con exportación a PDF, paneles de cumplimiento configurables e indicadores de salud.' }
            ]
        },
        en: {
            title: 'SIAL',
            subtitle: 'Multi-tenant occupational health SaaS for Uruguay · Founder & CEO',
            period: '2026 — Present',
            achievements: [
                { label: 'The Challenge', text: 'Centralize occupational health for companies with staff exposed to workplace risks: occupational medical records, exams, risk matrix, incidents, absenteeism, documentation and compliance alerts, under Uruguay\'s data protection law (Ley 18.331).' },
                { label: 'The Solution', text: 'My own product, built end to end: Angular 17 (standalone, signals) + ASP.NET Core 8 with Clean Architecture and MediatR + PostgreSQL 16 with pgcrypto encryption and per-tenant Row-Level Security. RBAC with 9 roles and an immutable audit log with a SHA-256 hash chain.' },
                { label: 'Infrastructure', text: 'Live on AWS sa-east-1 with Terraform: EC2 running Docker Compose and Caddy, RDS, S3, ECR, SSM Parameter Store and CloudWatch. Authentication with Clerk.' },
                { label: 'Status', text: 'Active product in continuous evolution: master clinical history with PDF export, configurable compliance panels and health indicators.' }
            ]
        }
    },
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
            subtitle: 'AI and Machine Learning Powered Digital Fraud Prevention System',
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
        id: 'dalsan',
        logo: 'assets/images/dalsan-logo.png',
        inProgress: true,
        techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Drizzle ORM', 'PostgreSQL (Neon)', 'Better Auth', 'Vercel'],
        es: {
            title: 'Distribuidora Dalsan',
            subtitle: 'De WordPress/WooCommerce a Next.js con panel de administración propio',
            period: '2026 — Presente',
            achievements: [
                { label: 'El Desafío', text: 'El sitio de Distribuidora Dalsan, mayorista de alimentos con más de 30 años en Uruguay, corría sobre WordPress + WooCommerce. Cualquier cambio de productos o contenido le resultaba complicado al cliente.' },
                { label: 'La Solución', text: 'Reconstrucción completa en Next.js 16 + React 19 + TypeScript + Tailwind CSS 4, con el catálogo de 119 productos y 37 categorías migrado, autoalojado y generado estáticamente, y fichas con consulta directa por WhatsApp.' },
                { label: 'Autogestión', text: 'Panel de administración propio donde el equipo de Dalsan agrega, edita y quita productos y categorías, sube imágenes y ve los cambios al instante sin deploy. Postgres (Neon) con Drizzle ORM, Better Auth y Vercel Blob.' },
                { label: 'Calidad', text: 'Tests unitarios y de servicios con Vitest + PGlite y end to end con Playwright.' }
            ]
        },
        en: {
            title: 'Distribuidora Dalsan',
            subtitle: 'From WordPress/WooCommerce to Next.js with a custom admin panel',
            period: '2026 — Present',
            achievements: [
                { label: 'The Challenge', text: 'The website of Distribuidora Dalsan, a food wholesaler with over 30 years in Uruguay, ran on WordPress + WooCommerce. Any change to products or content was a struggle for the client.' },
                { label: 'The Solution', text: 'Full rebuild in Next.js 16 + React 19 + TypeScript + Tailwind CSS 4, with the catalog of 119 products and 37 categories migrated, self-hosted and statically generated, and product pages with direct WhatsApp inquiries.' },
                { label: 'Self-service', text: 'Custom admin panel where the Dalsan team adds, edits and removes products and categories, uploads images and sees changes instantly with no deploy. Postgres (Neon) with Drizzle ORM, Better Auth and Vercel Blob.' },
                { label: 'Quality', text: 'Unit and service tests with Vitest + PGlite, and end-to-end tests with Playwright.' }
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
        id: 'crypto-bot',
        logo: 'assets/icons/make.svg',
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
