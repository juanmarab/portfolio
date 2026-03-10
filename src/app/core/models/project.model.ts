export interface Project {
    id: string;
    logo: string;
    title: string;
    subtitle: string;
    period: string;
    achievements: { label: string; text: string }[];
    linkUrl: string;
    githubUrl?: string;
    techStack: string[];
}
