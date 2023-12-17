import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/services/announcement.service';
import { Announcement } from 'src/models/announcement.model';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
})
export class AnnouncementsPage implements OnInit {
  announcements: Announcement[]=[];
  isDarkMode: boolean;
  darkModeIcon: string='moon';
  darkModeLabel: string='Dark Mode';

  constructor(private announcementService: AnnouncementService,private themeService: ThemeService) {
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

  ngOnInit() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.announcementService.getAnnouncements().subscribe({
      next: (response) => {
        console.log(response);
        for (const key in response) {
          this.announcements.push({ id: key, ...response[key] });
        }
        console.log(this.announcements);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
