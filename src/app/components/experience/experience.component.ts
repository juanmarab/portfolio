import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InfoCardComponent } from '../shared/info-card/info-card.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  standalone: true,
  imports: [
    CommonModule,
    InfoCardComponent
  ]
})
export class ExperienceComponent {
  workHistory = [
    {
      logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQFUGqLt38qgNQ/company-logo_200_200/company-logo_200_200/0/1694700941219/kinamic_logo?e=2147483647&v=beta&t=Kvtxyg65LvnuqhsLpZXjRhUYu6nZ5-dhKAK-J1KeoUk',
      title: 'Kinamic Technologies',
      subtitle: 'Full Stack Developer',
      dates: '(6-2022 to 12-2024)',
      points: [
        'Engineered scalable, high-availability web applications for a key Fintech client using .NET Core and Angular.',
        'Optimized application performance by refactoring complex backend queries and significantly reducing API response times.',
        'Automated CI/CD pipelines and managed cloud infrastructure in AWS, ensuring high uptime and minimizing manual deployment failures.',
        'Led the integration of front-end features in Angular, collaborating with a cross-functional team to deliver a seamless user experience.',
      ]
    },
    {
      logo: 'https://discover.give.do/static/img/logos/19WJ/9aad65c4-4ada-437d-a056-cd099c1e88ef.png',
      title: 'Tata Consultancy Services',
      subtitle: 'Junior Trainee',
      dates: '(6-2021 to 10-2021)',
      points: [
        'Collaborated effectively within a globally distributed Agile team (Mexico, India) to deliver and merge new features on schedule.',
        'Translated complex retail business requirements from The Home Depot team into precise technical specifications and actionable code.',
        'Identified and resolved 20+ client-reported bugs in the legacy Java codebase, significantly improving system stability.'
      ]
    }
  ];
}