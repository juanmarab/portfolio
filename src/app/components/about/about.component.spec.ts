import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollService } from '../../core/services/scroll.service';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent]
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
});
