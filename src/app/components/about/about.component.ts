import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { ScrollService } from '../../core/services/scroll.service';
import { IconComponent } from '../shared/icon/icon.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: [CommonModule, IconComponent]
})
export class AboutComponent {
  public langService = inject(LanguageService);
  private scroll = inject(ScrollService);

  scrollTo(sectionId: string): void {
    this.scroll.goTo(sectionId);
  }
}
