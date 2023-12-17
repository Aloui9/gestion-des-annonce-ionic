import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_ENDPOINT = 'https://gestion-des-annonces-ioninc-default-rtdb.europe-west1.firebasedatabase.app/users.json';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieves all users from the API.
   * @returns Observable array of users.
   */
  getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(API_ENDPOINT);
  }

  /**
   * Retrieves a user by their ID from the API.
   * @param userId ID of the user to retrieve.
   * @returns Observable containing the user data.
   */
  getUserById(userId: string): Observable<any> {
    const userUrl = `${API_ENDPOINT}/${userId}.json`;
    return this.httpClient.get<any>(userUrl);
  }

  /**
   * Adds a new user to the API.
   * @param user User data to be added.
   * @returns Observable containing the result of the addition.
   */
  addUser(user: any): Observable<any> {
    return this.httpClient.post(API_ENDPOINT, user);
  }

  /**
   * Updates an existing user in the API.
   * @param userId ID of the user to update.
   * @param newData New data to update for the user.
   * @returns Observable containing the result of the update.
   */
  updateUser(userId: string, newData: any): Observable<any> {
    const userUrl = `${API_ENDPOINT}/${userId}.json`;
    return this.httpClient.put(userUrl, newData);
  }

  /**
   * Deletes a user from the API.
   * @param userId ID of the user to delete.
   * @returns Observable containing the result of the deletion.
   */
  deleteUser(userId: string): Observable<any> {
    const userUrl = `${API_ENDPOINT}/${userId}.json`;
    return this.httpClient.delete(userUrl);
  }

  /**
   * Checks if a user with the provided email and password exists.
   * @param email Email of the user.
   * @param password Password of the user.
   * @returns Observable boolean indicating whether the user exists.
   */
  doesUserExist(email: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        return users && Object.values(users).some(user => user.email === email && user.password === password);
      })
    );
  }
}
