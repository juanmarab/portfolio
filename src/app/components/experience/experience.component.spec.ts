import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealObserverService } from '../../core/services/reveal-observer.service';
import { ExperienceComponent } from './experience.component';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
      providers: [{ provide: RevealObserverService, useValue: { observe: () => () => {} } }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('marks timeline items for reveal with a stagger', () => {
    const items = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.timeline-item')
    );

    expect(items.length).toBeGreaterThan(1);
    expect(items.every(item => item.classList.contains('reveal'))).toBeTrue();
    expect(items[1].style.getPropertyValue('--reveal-delay')).toBe('90ms');
  });
});
