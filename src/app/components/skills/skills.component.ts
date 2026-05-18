import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { SKILL_CATEGORIES, SkillCategory } from '../../core/data/skills.data';

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

  skillCategories: SkillCategory[] = SKILL_CATEGORIES;
  displayedCategories: SkillCategory[] = SKILL_CATEGORIES;

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
