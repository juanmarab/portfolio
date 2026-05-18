export type SkillCategoryKey = 'frontend' | 'backend' | 'cloud_db' | 'devops' | 'ai';

export interface SkillItem {
    name: string;
    icon: string;
}

export interface SkillCategory {
    titleKey: SkillCategoryKey;
    items: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        titleKey: 'frontend',
        items: [
            { name: 'Angular', icon: 'assets/icons/angular.svg' },
            { name: 'TypeScript', icon: 'assets/icons/typescript.svg' },
            { name: 'Vue 3', icon: 'assets/icons/vue.svg' }
        ]
    },
    {
        titleKey: 'backend',
        items: [
            { name: '.NET (C#)', icon: 'assets/icons/dotnet.svg' },
            { name: 'FastAPI', icon: 'assets/icons/fastapi.svg' },
            { name: 'Java', icon: 'assets/icons/java.svg' },
            { name: 'Python', icon: 'assets/icons/python.svg' }
        ]
    },
    {
        titleKey: 'cloud_db',
        items: [
            { name: 'AWS', icon: 'assets/icons/aws.svg' },
            { name: 'Cloud Run', icon: 'assets/icons/cloudrun.svg' },
            { name: 'PostgreSQL', icon: 'assets/icons/postgresql.svg' },
            { name: 'SQL Server', icon: 'assets/icons/sqlserver.svg' }
        ]
    },
    {
        titleKey: 'devops',
        items: [
            { name: 'Docker', icon: 'assets/icons/docker.svg' },
            { name: 'Git / GitHub', icon: 'assets/icons/git.svg' },
            { name: 'Make', icon: 'assets/icons/make.svg' }
        ]
    },
    {
        titleKey: 'ai',
        items: [
            { name: 'Claude', icon: 'assets/icons/claude.svg' },
            { name: 'DistilBERT', icon: 'assets/icons/huggingface.svg' }
        ]
    }
];
