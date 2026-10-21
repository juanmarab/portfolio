import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealObserverService } from '../../core/services/reveal-observer.service';
import { ScrollService } from '../../core/services/scroll.service';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [{ provide: RevealObserverService, useValue: { observe: () => () => {} } }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('delegates scrollTo to ScrollService', () => {
    const scrollService = TestBed.inject(ScrollService);
    spyOn(scrollService, 'goTo');

    component.scrollTo('projects');

    expect(scrollService.goTo).toHaveBeenCalledOnceWith('projects');
  });

  it('marks the profile image and the about card for reveal', () => {
    const root: HTMLElement = fixture.nativeElement;

    const wrapper = root.querySelector('.profile-image-wrapper') as HTMLElement;

    expect(wrapper.classList).toContain('reveal');
    expect(root.querySelector('.about-content-card')?.classList).toContain('reveal');
    expect(getComputedStyle(wrapper).getPropertyValue('--reveal-from').trim()).toBe('scale(0.92)');
  });
});
