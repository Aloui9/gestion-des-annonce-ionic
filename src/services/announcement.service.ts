import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement.model';

const ANNOUNCEMENTS_API_ENDPOINT = 'https://gestion-des-annonces-ioninc-default-rtdb.europe-west1.firebasedatabase.app/annoucements.json'; // Replace with your actual endpoint

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private httpClient: HttpClient) {}

  getAnnouncements(): Observable<any[]> {
    return this.httpClient.get<any[]>(ANNOUNCEMENTS_API_ENDPOINT);
  }

  addAnnouncement(announcementForm: Announcement): Observable<any> {
    return this.httpClient.post(ANNOUNCEMENTS_API_ENDPOINT, announcementForm);
  }

}
