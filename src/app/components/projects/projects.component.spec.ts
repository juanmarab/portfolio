import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealObserverService } from '../../core/services/reveal-observer.service';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [{ provide: RevealObserverService, useValue: { observe: () => () => {} } }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('marks project cards for reveal with a stagger', () => {
    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.project-card');

    expect(cards.length).toBeGreaterThan(1);
    cards.forEach(card => expect(card.classList).toContain('reveal'));
    expect(cards[1].style.getPropertyValue('--reveal-delay')).toBe('80ms');
  });
});
