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
        'Developed and maintained web applications for a Fintech client, delivering robust and scalable solutions.',
        'Resolved complex software issues, ensuring the seamless operation of the platform and enhancing user experience.',
        'Collaborated with a cross-functional team to implement front-end features using Angular and back-end services with .NET Core.',
        'Managed deployments and cloud infrastructure, leveraging AWS to ensure high availability and performance.',
        'Contributed to process improvements by automating workflows and optimizing development practices.'
      ]
    },
    {
      logo: 'https://discover.give.do/static/img/logos/19WJ/9aad65c4-4ada-437d-a056-cd099c1e88ef.png',
      title: 'Tata Consultancy Services',
      subtitle: 'Junior Trainee',
      dates: '(6-2021 to 10-2021)',
      points: [
        'Worked as part of a globally distributed team across Mexico, India, and other regions, contributing to a large-scale retail project.',
        'Acquired hands-on experience in Java Spring Boot, building and enhancing RESTful APIs for backend services.',
        'Gained a deep understanding of the retail business domain while collaborating with The Home Depot team.',
        'Strengthened communication and teamwork skills, enabling efficient collaboration across different cultures and time zones.'
      ]
    }
  ];
}
