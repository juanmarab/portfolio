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

  describe('mobile menu', () => {
    const locked = () => document.body.classList.contains('menu-open');

    afterEach(() => {
      document.body.classList.remove('menu-open');
    });

    it('toggling the menu locks and unlocks body scroll', () => {
      component.toggleMenu();
      expect(locked()).toBeTrue();

      component.toggleMenu();
      expect(locked()).toBeFalse();
    });

    it('Escape closes the menu and unlocks body scroll', () => {
      component.toggleMenu();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(component.isMenuOpen).toBeFalse();
      expect(locked()).toBeFalse();
    });

    it('resizing to desktop closes the menu', () => {
      component.toggleMenu();
      spyOnProperty(window, 'innerWidth').and.returnValue(1024);

      component.onResize();

      expect(component.isMenuOpen).toBeFalse();
      expect(locked()).toBeFalse();
    });

    it('resizing within mobile widths keeps the menu open', () => {
      component.toggleMenu();
      spyOnProperty(window, 'innerWidth').and.returnValue(500);

      component.onResize();

      expect(component.isMenuOpen).toBeTrue();
      expect(locked()).toBeTrue();
    });

    it('a nav link calls ScrollService.goTo and closes the menu', () => {
      const scrollService = TestBed.inject(ScrollService);
      spyOn(scrollService, 'goTo');
      component.toggleMenu();

      fixture.nativeElement.querySelector('.nav-link').click();

      expect(scrollService.goTo).toHaveBeenCalledOnceWith('experience');
      expect(component.isMenuOpen).toBeFalse();
      expect(locked()).toBeFalse();
    });

    it('releases the body lock when destroyed', () => {
      component.toggleMenu();

      fixture.destroy();

      expect(locked()).toBeFalse();
    });

    it('renders the scroll progress bar inside the header', () => {
      expect(fixture.nativeElement.querySelector('header.header > app-scroll-progress')).not.toBeNull();
    });
  });
});
