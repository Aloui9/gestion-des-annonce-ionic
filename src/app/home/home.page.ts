// home.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  totalAnnouncements=200;
  announcementsToday=200;
  announcementsYesterday=200;
  isDarkMode: boolean;
  darkModeIcon: string='moon';
  darkModeLabel: string='Dark Mode';

  constructor(private router: Router,private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

    private updateDarkModeButton() {
    this.darkModeIcon = this.themeService.isDarkMode() ? 'sunny' : 'moon';
    this.darkModeLabel = this.themeService.isDarkMode() ? 'Light Mode' : 'Dark Mode';
  }


  toggleDarkMode() {
    this.themeService.setDarkMode(!this.themeService.isDarkMode());
    this.updateDarkModeButton();
  }

  goToLoginPage() {

    // Add navigation logic to the login page
    this.router.navigate(['/login']);
  }

  goToRegisterPage() {
    // Add navigation logic to the register page
    this.router.navigate(['/register']);
  }

  goToAnnouncements() {
    // Add navigation logic to the announcements page
    this.router.navigate(['/announcements']);
  }
}
