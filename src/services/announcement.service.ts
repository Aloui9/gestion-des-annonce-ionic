// announcement.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement.model';

// API endpoint for announcements
const ANNOUNCEMENTS_API_ENDPOINT = 'https://gestion-des-annonces-ioninc-default-rtdb.europe-west1.firebasedatabase.app/annoucements.json';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {

  constructor(private httpClient: HttpClient) {}

  /**
   * Fetches all announcements from the API.
   * @returns Observable array of announcements.
   */
  getAnnouncements(): Observable<any[]> {
    return this.httpClient.get<any[]>(ANNOUNCEMENTS_API_ENDPOINT);
  }

  /**
   * Adds a new announcement to the API.
   * @param announcementForm The announcement data to be added.
   * @returns Observable of the HTTP response.
   */
  addAnnouncement(announcementForm: Announcement): Observable<any> {
    return this.httpClient.post(ANNOUNCEMENTS_API_ENDPOINT, announcementForm);
  }

  /**
   * Retrieves details of a specific announcement by ID from the API.
   * @param id The ID of the announcement.
   * @returns Observable of the announcement details.
   */
  getAnnouncementById(id: string): Observable<any> {
    return this.httpClient.get(
      `https://gestion-des-annonces-ioninc-default-rtdb.europe-west1.firebasedatabase.app/annoucements/${id}.json`
    );
  }

  /**
   * Deletes a specific announcement by ID from the API.
   * @param id The ID of the announcement to be deleted.
   * @returns Observable of the HTTP response.
   */
  deleteAnnouncement(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://gestion-des-annonces-ioninc-default-rtdb.europe-west1.firebasedatabase.app/annoucements/${id}.json`
    );
  }
}
