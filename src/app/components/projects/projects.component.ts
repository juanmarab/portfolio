import { Component } from '@angular/core';
import { InfoCardComponent } from "../shared/info-card/info-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone: true,
  imports: [
    CommonModule,
    InfoCardComponent
  ]
})
export class ProjectsComponent {

  projectsHistory = [
    {
  logo: 'https://www.shutterstock.com/image-vector/cyber-security-ai-intelligence-protection-600nw-2481979119.jpg',
  title: 'Guard-IA (Capstone Project - Universidad ORT)',
  subtitle: 'AI-Powered Anomaly Detection & Digital Fraud Prevention System',
  dates: '(2025-2026)',
  points: [
    'The Challenge: Mitigating the rising threat of AI-driven phishing and sophisticated automated attacks targeting corporate email environments.',
    'The Solution: Developed a high-performance security middleware (sponsored by Strike Security) integrated with Google Workspace, featuring a hybrid detection pipeline (Heuristics + Machine Learning + LLM) for real-time threat analysis.',
    'Performance & Precision: Achieved a 99.57% Recall rate using a fine-tuned DistilBERT model with an inference latency of only 18ms, complemented by human-readable explainability via Claude Opus 4.5.',
    'Tech Stack: Vue 3 (Composition API), FastAPI (Python), DistilBERT, Claude Opus, PostgreSQL (Neon), Docker, and Cloud Run.'
  ], 
  linkUrl:"https://github.com/sogliano/guardia"
  },
    {
      logo: 'https://revolucionatupyme.com/wp-content/uploads/2024/08/Make-logo-1024x264.png',
      title: 'Crypto Asset Tracker & Automation',
      subtitle: 'Automated Trading Analysis Tool',
      dates: '(Personal Project)',
      points: [
        'The Challenge:Needed a real-time system to efficiently track leveraged trading positions.',
        'The Solution:Built a custom automation workflow using make to monitor market indicators and log trade performance automatically.',
        'Tech Stack: Make, Webhooks, JSON, Crypto APIs.'
      ],
      linkUrl:"https://github.com/juanmarab/crypto-trading-bot.git",
    },
    {
      logo: 'https://angular.io/assets/images/logos/angular/angular.png',
      title: 'Professional Portfolio (This Site)',
      subtitle: 'Modern Angular Portfolio Architecture',
      dates: '(Ongoing Project)',
      points: [
        'The Challenge: Building a professional, scalable, and maintainable personal brand platform from scratch.',
        'The Solution: Engineered a component-based application using Angular\'s standalone components and a reusable InfoCard for data.',
        'Tech Stack: Angular, TypeScript, Bootstrap, GitHub Pages.'
      ],
      linkUrl:"https://github.com/juanmarab/portfolio.git"
    }
  ];

  constructor() { }
}