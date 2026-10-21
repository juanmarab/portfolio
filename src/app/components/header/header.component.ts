import { Component, HostListener, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { ScrollService } from '../../core/services/scroll.service';
import { ScrollProgressComponent } from '../shared/scroll-progress/scroll-progress.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ScrollProgressComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  isMenuOpen = false;
  isScrolled = false;

  public langService = inject(LanguageService);
  private scroll = inject(ScrollService);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMenu();
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  ngOnDestroy() {
    this.closeMenu();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.syncBodyLock();
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.syncBodyLock();
  }

  scrollTo(sectionId: string) {
    this.closeMenu();
    this.scroll.goTo(sectionId);
  }

  private syncBodyLock() {
    document.body.classList.toggle('menu-open', this.isMenuOpen);
  }
}
