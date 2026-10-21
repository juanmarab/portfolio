import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollService } from '../../core/services/scroll.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
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

  it('closes the mobile menu when navigating', () => {
    spyOn(TestBed.inject(ScrollService), 'goTo');
    component.isMenuOpen = true;

    component.scrollTo('projects');

    expect(component.isMenuOpen).toBeFalse();
  });
});
