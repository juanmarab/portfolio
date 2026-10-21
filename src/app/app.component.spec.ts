import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { LanguageService } from './core/services/language.service';
import { ScrollService } from './core/services/scroll.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const create = (): void => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();
  });

  afterEach(() => {
    TestBed.inject(LanguageService).setLanguage('en');
    history.replaceState(null, '', location.pathname);
  });

  it('renders five collapsible sections in order', () => {
    create();

    const ids = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('app-section-shell section')
    ).map(section => section.id);

    expect(ids).toEqual(['experience', 'projects', 'skills', 'education', 'contact']);
  });

  it('meta strings carry the data counts', () => {
    create();

    expect(component.meta().experience).toContain('3');
    expect(component.meta().projects).toContain('5');
  });

  it('meta strings follow the language', () => {
    create();

    TestBed.inject(LanguageService).setLanguage('es');
    fixture.detectChanges();

    expect(component.meta().experience).toContain('puestos');
    expect(component.meta().projects).toContain('proyectos');

    TestBed.inject(LanguageService).setLanguage('en');
    fixture.detectChanges();

    expect(component.meta().experience).toContain('roles');
  });

  it('navigates to the URL hash after the first render', () => {
    const goTo = spyOn(ScrollService.prototype, 'goTo');
    window.location.hash = '#projects';

    create();

    expect(goTo).toHaveBeenCalledOnceWith('projects');
  });

  it('does not navigate when the URL has no hash', () => {
    const goTo = spyOn(ScrollService.prototype, 'goTo');
    history.replaceState(null, '', location.pathname);

    create();

    expect(goTo).not.toHaveBeenCalled();
  });
});
