// user.service.ts

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

  getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(API_ENDPOINT);
  }

  getUserById(userId: string): Observable<any> {
    const userUrl = `${API_ENDPOINT}/${userId}.json`;
    return this.httpClient.get<any>(userUrl);
  }

  addUser(user: any): Observable<any> {
    return this.httpClient.post(API_ENDPOINT, user);
  }

  updateUser(userId: string, newData: any): Observable<any> {
    const userUrl = `${API_ENDPOINT}/${userId}.json`;
    return this.httpClient.put(userUrl, newData);
  }

  deleteUser(userId: string): Observable<any> {
    const userUrl = `${API_ENDPOINT}/${userId}.json`;
    return this.httpClient.delete(userUrl);
  }

  doesUserExist(email: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        return users && Object.values(users).some(user => user.email === email && user.password === password);
      })
    );
  }

}
