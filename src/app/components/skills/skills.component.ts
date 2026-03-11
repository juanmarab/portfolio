import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SkillsComponent implements OnInit {
  public langService = inject(LanguageService);

  activeCategory: string = 'all';

  skillCategories: {
    titleKey: 'frontend' | 'backend' | 'cloud_db' | 'devops' | 'ai',
    items: { name: string, icon: string }[]
  }[] = [
    {
      titleKey: 'frontend',
      items: [
        { name: 'Angular', icon: 'https://img.icons8.com/?size=100&id=71257&format=png' },
        { name: 'TypeScript', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg' },
        { name: 'Vue 3', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png' }
      ]
    },
    {
      titleKey: 'backend',
      items: [
        { name: '.NET (C#)', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg' },
        { name: 'FastAPI', icon: 'https://cdn.worldvectorlogo.com/logos/fastapi-1.svg' },
        { name: 'Java', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg' },
        { name: 'Python', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' }
      ]
    },
    {
      titleKey: 'cloud_db',
      items: [
        { name: 'AWS', icon: 'https://img.icons8.com/color/48/000000/amazon-web-services.png' },
        { name: 'Cloud Run', icon: 'https://www.vectorlogo.zone/logos/google_cloud_run/google_cloud_run-icon.svg' },
        { name: 'PostgreSQL', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg' },
        { name: 'SQL Server', icon: 'https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg' }
      ]
    },
    {
      titleKey: 'devops',
      items: [
        { name: 'Docker', icon: 'https://img.icons8.com/color/48/000000/docker.png' },
        { name: 'Git / GitHub', icon: 'https://img.icons8.com/color/48/000000/git.png' },
        { name: 'Make', icon: 'https://cdn.prod.website-files.com/5fae698147f1c55fc67ee08c/620d4560d77bb82f022b8ad2_Make-Formerly-Integromat-Primary-Version.png' }
      ]
    },
    {
      titleKey: 'ai',
      items: [
        { name: 'Claude', icon: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/claude-color.png' },
        { name: 'DistilBERT', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' }
      ]
    }
  ];

  displayedCategories = this.skillCategories;

  ngOnInit() {
    this.displayedCategories = this.skillCategories;
  }

  setActiveCategory(categoryKey: string) {
    this.activeCategory = categoryKey;
    if (categoryKey === 'all') {
      this.displayedCategories = this.skillCategories;
    } else {
      this.displayedCategories = this.skillCategories.filter(cat => cat.titleKey === categoryKey);
    }
  }
}
