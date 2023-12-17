// Import necessary Angular modules and services
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementService } from 'src/services/announcement.service';

@Component({
  selector: 'app-announcement-details',
  templateUrl: 'announcement-details.page.html',
  styleUrls: ['announcement-details.page.scss'],
})
export class AnnouncementDetailsPage implements OnInit {
  announcement: any;
  announcementId: string = '';

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit() {
    // Retrieve announcement details based on the route parameter
    if (localStorage.getItem('announcementId')) {
      this.announcementId = localStorage.getItem('announcementId')!;
      this.announcementService.getAnnouncementById(this.announcementId).subscribe({
        next: (response) => {
          this.announcement = response;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
