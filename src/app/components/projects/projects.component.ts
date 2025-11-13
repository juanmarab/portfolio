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
      title: 'Guard-IA (Thesis Project)',
      subtitle: 'AI-Powered Fraud Detection System',
      dates: '(2025 - Present)',
      points: [
        'The Challenge: Mitigating the rising threat of phishing and email spoofing for corporate environments.',
        'The Solution: Developed a comprehensive detection system (sponsored by Strike Security) focusing on real-time threat analysis.',
        'Tech Stack: .NET, Angular, Python, AI Integration.'
      ]
    },
    {
      logo: 'https://revolucionatupyme.com/wp-content/uploads/2024/08/Make-logo-1024x264.png',
      title: 'Crypto Asset Tracker & Automation',
      subtitle: 'Automated Trading Analysis Tool',
      dates: '(Personal Project)',
      points: [
        'The Challenge:Needed a real-time system to efficiently track leveraged trading positions (ETH/SOL).',
        'The Solution:Built a custom automation workflow using n8n to monitor market indicators and log trade performance automatically.',
        'Tech Stack: Make, Webhooks, JSON, Crypto APIs.'
      ]
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
      ]
    }
  ];

  constructor() { }
}