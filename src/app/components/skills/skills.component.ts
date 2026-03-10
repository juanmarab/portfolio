import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SkillsComponent {
  public langService = inject(LanguageService);

  skills = [
    { name: 'Angular', icon: 'https://img.icons8.com/?size=100&id=71257&format=png' },
    { name: '.NET (C#)', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Microsoft_.NET_logo.svg/800px-Microsoft_.NET_logo.svg.png' },
    { name: 'AWS', icon: 'https://img.icons8.com/color/48/000000/amazon-web-services.png' },
    { name: 'TypeScript', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/TypeScript_ESLint_logo.svg/768px-TypeScript_ESLint_logo.svg.png' },
    { name: 'PostgreSQL', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg' },
    { name: 'SQL', icon: 'https://www.svgrepo.com/show/331760/sql-database-generic.svg' },
    { name: 'MongoDB', icon: 'https://img.icons8.com/color/48/000000/mongodb.png' },
    { name: 'Docker', icon: 'https://img.icons8.com/color/48/000000/docker.png' },
    { name: 'Git / GitHub', icon: 'https://img.icons8.com/color/48/000000/git.png' },
    { name: 'Go', icon: 'https://img.icons8.com/color/48/000000/golang.png' },
    { name: 'Java Spring', icon: 'https://img.icons8.com/color/48/000000/spring-logo.png' },
    { name: 'Firebase', icon: 'https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png' }
  ];
}
