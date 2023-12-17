// Import necessary Angular modules and services
import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/services/announcement.service';
import { Announcement } from 'src/models/announcement.model';
import { ThemeService } from 'src/services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
})
export class AnnouncementsPage implements OnInit {
  announcements: Announcement[] = [];
  tmpAnnouncements: Announcement[] = [];
  isDarkMode: boolean;
  darkModeIcon: string = 'moon';
  darkModeLabel: string = 'Dark Mode';
  selectedCategory: string | null = null;

  constructor(
    private announcementService: AnnouncementService,
    private themeService: ThemeService,
    private router: Router
  ) {
    // Set dark mode based on user preference
    this.isDarkMode = this.themeService.isDarkMode();
  }

  // Update the dark mode button based on the current dark mode status
  private updateDarkModeButton() {
    this.darkModeIcon = this.themeService.isDarkMode() ? 'sunny' : 'moon';
    this.darkModeLabel = this.themeService.isDarkMode() ? 'Light Mode' : 'Dark Mode';
  }

  // Toggle dark mode when the dark mode button is clicked
  toggleDarkMode() {
    this.themeService.setDarkMode(!this.themeService.isDarkMode());
    this.updateDarkModeButton();
  }

  // Initialize the component by loading announcements
  ngOnInit() {
    this.loadAnnouncements();
  }

  // Load announcements from the service
  loadAnnouncements() {
    this.announcementService.getAnnouncements().subscribe({
      next: (response) => {
        // Populate the announcements array with data from the response
        for (const key in response) {
          this.announcements.push({ id: key, ...response[key] });
        }
        // Set the temporary announcements array for filtering
        this.tmpAnnouncements = this.announcements;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Filter announcements based on the selected category
  filterByCategory() {
    if (!this.selectedCategory || this.selectedCategory === '') {
      // If no category selected, display all announcements
      this.tmpAnnouncements = this.announcements;
    } else {
      // Filter announcements based on the selected category
      this.tmpAnnouncements = this.announcements.filter(
        (announcement) =>
          announcement.category.toLowerCase() === this.selectedCategory?.toLowerCase()
      );
    }
  }

  // Filter announcements by the logged-in user
  filterByLoggedInUser() {
    // Retrieve information about the logged-in user
    const loggedInUser = localStorage.getItem('userEmail');

    // Filter announcements based on the logged-in user
    this.tmpAnnouncements = this.tmpAnnouncements.filter(
      (announcement) => announcement.announcer === loggedInUser
    );
  }

  // Store the selected announcement ID in local storage and navigate to details page
  sendId(id: any) {
    localStorage.setItem('announcementId', id);
    this.router.navigate(['/announcement-details']);
  }
}
