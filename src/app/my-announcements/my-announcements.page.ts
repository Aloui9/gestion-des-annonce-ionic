// my-announcements.page.ts

import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Announcement } from 'src/models/announcement.model';
import { AnnouncementService } from 'src/services/announcement.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-my-announcements',
  templateUrl: './my-announcements.page.html',
  styleUrls: ['./my-announcements.page.scss'],
})
export class MyAnnouncementsPage {
  announcements: Announcement[] = [];
  tmpAnnouncements: Announcement[] = [];
  isDarkMode: boolean;
  darkModeIcon: string = 'moon';
  darkModeLabel: string = 'Dark Mode';
  selectedCategory: string | null = null;

  constructor(
    private announcementService: AnnouncementService,
    private themeService: ThemeService,
    private alertController: AlertController
  ) {
    this.isDarkMode = this.themeService.isDarkMode();
    this.loadAnnouncements();
  }

  // Update dark mode button based on the current state
  private updateDarkModeButton() {
    this.darkModeIcon = this.themeService.isDarkMode() ? 'sunny' : 'moon';
    this.darkModeLabel = this.themeService.isDarkMode() ? 'Light Mode' : 'Dark Mode';
  }

  // Toggle dark mode when the button is clicked
  toggleDarkMode() {
    this.themeService.setDarkMode(!this.themeService.isDarkMode());
    this.updateDarkModeButton();
  }

  // Load announcements for the logged-in user
  loadAnnouncements() {
    this.announcements = [];
    this.announcementService.getAnnouncements().subscribe({
      next: (response) => {
        for (const key in response) {
          this.announcements.push({ id: key, ...response[key] });
        }
        // Get the logged-in user's email from local storage
        const loggedInUser = localStorage.getItem('userEmail');
        // Filter announcements for the logged-in user
        this.tmpAnnouncements = this.announcements.filter(
          (announcement) => announcement.announcer === loggedInUser
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Present an alert to confirm the deletion of an announcement
  async presentAlert(id: any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this ad?',
      buttons: [
        'No',
        {
          text: 'Yes',
          handler: () => {
            // Call the service to delete the announcement
            this.announcementService.deleteAnnouncement(id).subscribe({
              next: (response) => {
                // Reload announcements after deletion
                this.loadAnnouncements();
              },
              error: (err) => {
                console.log(err);
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
