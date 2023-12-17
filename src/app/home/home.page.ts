import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementService } from 'src/services/announcement.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  totalAnnouncements = 0; // Total number of announcements
  myAnnouncements = 0; // Number of announcements created by the user
  announcements: any[] = []; // Array to store announcements
  isDarkMode: boolean; // Dark mode flag
  darkModeIcon: string = 'moon'; // Icon for dark mode button
  darkModeLabel: string = 'Dark Mode'; // Label for dark mode button

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private annoucementsService: AnnouncementService
  ) {
    // Initialize dark mode and fetch announcements
    this.isDarkMode = this.themeService.isDarkMode();
    this.annoucementsService.getAnnouncements().subscribe({
      next: (response) => {
        // Loop through response to populate announcements array
        for (const key in response) {
          this.announcements.push({ id: key, ...response[key] });
        }
        // Update total and user-specific announcements count
        this.totalAnnouncements = this.announcements.length;
        const userEmail = localStorage.getItem('userEmail');
        this.myAnnouncements = this.announcements.filter(
          (announcement) => announcement.announcer === userEmail
        ).length;
      },
    });
  }

  private updateDarkModeButton() {
    // Update dark mode button icon and label based on the current state
    this.darkModeIcon = this.themeService.isDarkMode() ? 'sunny' : 'moon';
    this.darkModeLabel = this.themeService.isDarkMode() ? 'Light Mode' : 'Dark Mode';
  }

  toggleDarkMode() {
    // Toggle dark mode and update the button
    this.themeService.setDarkMode(!this.themeService.isDarkMode());
    this.updateDarkModeButton();
  }

  goToLoginPage() {
    // Navigate to the login page
    this.router.navigate(['/login']);
  }

  goToRegisterPage() {
    // Navigate to the register page
    this.router.navigate(['/register']);
  }

  goToAnnouncements() {
    // Navigate to the announcements page
    this.router.navigate(['/announcements']);
  }

  goToMyAnnouncements() {
    // Navigate to the user's announcements page
    this.router.navigate(['/my-announcements']);
  }

  logOut() {
    // Clear local storage to simulate logout
    localStorage.clear();
  }
}