
import { Component } from '@angular/core';
import { Announcement } from 'src/models/announcement.model';
import { AnnouncementService } from 'src/services/announcement.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.page.html',
  styleUrls: ['./add-announcement.page.scss'],
})
export class AddAnnouncementPage {
  announcer:any;
  announcementForm: Announcement = {
    imageUrl: '',
    title: '',
    description: '',
    price: '0',
    category: '',
    announcer: ''
  };

  isDarkMode: boolean;
  darkModeIcon: string='moon';
  darkModeLabel: string='Dark Mode';

  constructor(private announcementService: AnnouncementService,private themeService: ThemeService) {
    this.announcer=localStorage.getItem('userEmail');

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

  addAnnouncement() {
    this.announcementForm.announcer=this.announcer;
    this.announcementService.addAnnouncement(this.announcementForm).subscribe(() => {
      // Handle successful addition (e.g., navigate back to announcements page)
    });
  }
}
