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
    { name: '.NET (C#)', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg' },
    { name: 'AWS', icon: 'https://img.icons8.com/color/48/000000/amazon-web-services.png' },
    { name: 'TypeScript', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg' },
    { name: 'Vue 3', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png' },
    { name: 'FastAPI', icon: 'https://cdn.worldvectorlogo.com/logos/fastapi-1.svg' },
    { name: 'Python', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
    { name: 'PostgreSQL', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg' },
    { name: 'Docker', icon: 'https://img.icons8.com/color/48/000000/docker.png' },
    { name: 'Cloud Run', icon: 'https://www.vectorlogo.zone/logos/google_cloud_run/google_cloud_run-icon.svg' },
    { name: 'DistilBERT', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
    { name: 'Claude', icon: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/claude-color.png' },
    { name: 'Git / GitHub', icon: 'https://img.icons8.com/color/48/000000/git.png' }
  ];
}
