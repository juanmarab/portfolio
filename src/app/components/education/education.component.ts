import { Component } from '@angular/core';
import { InfoCardComponent } from "../shared/info-card/info-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  standalone: true, 
  imports: [
    CommonModule,
    InfoCardComponent
  ]
})
export class EducationComponent {

  // 1. Define tu array de datos
  educationHistory = [
    {
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMh6i2GJOjC6DpnfI0rju0zGL9dVVsNH2BGA&s',
      title: 'Bachelor in Systems',
      subtitle: 'University ORT Uruguay',
      dates: '(2019 - Present)',
      points: [
        'Currently pursuing a Bachelor\'s degree in Systems with a focus on software development and technology.',
        'Enhanced problem-solving skills through practical and theoretical projects.',
        'Gained experience in teamwork and collaboration for academic and professional growth.'
      ]
    },
    {
      logo: 'https://www2.utu.edu.uy/wp-content/uploads/2025/04/Logotipo-DGETP-Vertical-fondo-sobre-color-2.png',
      title: 'Technical High School in Computer Science',
      subtitle: 'UTU, Uruguay',
      dates: '(2015 - 2018)',
      points: [
        'Completed a technical program focused on foundational computing concepts and programming.',
        'Acquired essential skills in software development, algorithms, and data structures.',
        'Developed strong technical abilities, preparing for higher education in the field.'
      ]
    }
  ];

  constructor() { }
}