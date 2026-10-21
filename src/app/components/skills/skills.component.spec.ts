import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SKILL_CATEGORIES } from '../../core/data/skills.data';
import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets a stagger index on each skill card', () => {
    const group = (fixture.nativeElement as HTMLElement).querySelector('.skills-category-group') as HTMLElement;
    const cards = group.querySelectorAll<HTMLElement>('.skill-card');

    expect(cards[1].style.getPropertyValue('--i')).toBe('1');
  });

  it('re-creates cards when the filter changes', () => {
    const root: HTMLElement = fixture.nativeElement;
    const before = root.querySelector('.skill-card')!;

    component.setActiveCategory('frontend');
    fixture.detectChanges();

    const backend = SKILL_CATEGORIES.find(category => category.titleKey === 'frontend')!;
    const after = root.querySelectorAll('.skill-card');

    expect(after.length).toBe(backend.items.length);
    expect(after[0]).not.toBe(before);
  });
});
