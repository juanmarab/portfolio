import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor
import { InfoCardComponent } from '../shared/info-card/info-card.component'; // (Ajusta la ruta)

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  
  standalone: true,
  imports: [
    CommonModule,
    InfoCardComponent
  ]
})
export class AboutComponent {

  // Aplanamos la data del "About Me"
  aboutData = {
    subtitle: 'Hi! I’m a Systems Engineering student and Full Stack Developer with 2+ years of experience building fintech web applications using .NET (C#) and Angular.',
    
    points: [
      'Passionate about problem-solving and clean code, I thrive in collaborative environments where I can contribute to impactful projects while continuously learning.',
      
      'My strengths:', 
      '   Backend Development: REST APIs, .NET Core, Entity Framework',
      '   Frontend Development: Angular, TypeScript, responsive UI/UX',
      '   Agile Methodologies: Scrum, iterative development, teamwork',
  
      'Always eager for new challenges, I’m looking to expand my skills in cloud technologies, microservices, and cutting-edge frameworks.',    
      'Let’s connect and build something great!'
    ]
  };
}