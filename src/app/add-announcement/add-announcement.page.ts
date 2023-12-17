// Import necessary Angular and Ionic modules and services
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

// Import models and services
import { Announcement } from 'src/models/announcement.model';
import { AnnouncementService } from 'src/services/announcement.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.page.html',
  styleUrls: ['./add-announcement.page.scss'],
})
export class AddAnnouncementPage {
  announcer: any;
  announcementForm: Announcement = {
    id: '',
    imageUrl: '',
    title: '',
    description: '',
    price: '0',
    category: '',
    announcer: ''
  };

  isDarkMode: boolean;
  darkModeIcon: string = 'moon';
  darkModeLabel: string = 'Dark Mode';

  constructor(
    private announcementService: AnnouncementService,
    private toastController: ToastController,
    private themeService: ThemeService,
    private router: Router
  ) {
    // Retrieve announcer information from local storage
    this.announcer = localStorage.getItem('userEmail');

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

  // Add a new announcement
  addAnnouncement() {
    // Set the announcer for the announcement
    this.announcementForm.announcer = this.announcer;

    // Check if the announcer is logged in before adding the announcement
    if (this.announcementForm.announcer && this.announcementForm.announcer.length) {
      // Add the announcement and handle the response
      this.announcementService.addAnnouncement(this.announcementForm).subscribe({
        next: (response) => {
          // Display a success toast and navigate to my announcements page
          this.presentSuccessToast('Announcement published!');
          this.router.navigate(['/my-announcements']);
        },
        error: (err) => {
          // Log any errors to the console
          console.log(err);
        }
      });
    } else {
      // Display a toast indicating the need to log in before adding announcements
      this.presentToast('It needs to login to add announcements');
    }
  }

  // Display a generic toast message
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Display for 3 seconds
      position: 'middle',
      color: 'danger' // Customize the color
    });
    toast.present();
  }

  // Display a success toast message
  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Display for 3 seconds
      position: 'middle',
      color: 'success' // Customize the color
    });
    toast.present();
  }
}
