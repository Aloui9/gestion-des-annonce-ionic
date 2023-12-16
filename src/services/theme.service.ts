// theme.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeEnabled: boolean = false;

  isDarkMode() {
    return this.isDarkModeEnabled;
  }

  setDarkMode(enable: boolean) {
    this.isDarkModeEnabled = enable;
    document.body.classList.toggle('dark', enable);
    // You may want to store the user's preference in local storage for persistence
  }
}
