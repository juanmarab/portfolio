import { TestBed } from '@angular/core/testing';

import { IconComponent, IconName } from './icon.component';

describe('IconComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent]
    }).compileComponents();
  });

  it('renders a path for every new icon name', () => {
    const names: IconName[] = ['user', 'envelope', 'chat', 'send'];

    for (const name of names) {
      const fixture = TestBed.createComponent(IconComponent);
      fixture.componentRef.setInput('name', name);
      fixture.detectChanges();

      const path: SVGPathElement | null = fixture.nativeElement.querySelector('svg path');
      expect(path).withContext(name).not.toBeNull();
      expect((path?.getAttribute('d') ?? '').length).withContext(name).toBeGreaterThan(20);
    }
  });

  it('is hidden from assistive tech by default', () => {
    const fixture = TestBed.createComponent(IconComponent);
    fixture.componentRef.setInput('name', 'github');
    fixture.detectChanges();

    const svg: SVGElement = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });
});
