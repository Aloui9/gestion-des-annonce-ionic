import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeEnabled: boolean = false;

  /**
   * Checks whether dark mode is currently enabled.
   * @returns true if dark mode is enabled, false otherwise.
   */
  isDarkMode() {
    return this.isDarkModeEnabled;
  }

  /**
   * Toggles dark mode on or off.
   * @param enable Set to true to enable dark mode, false to disable.
   */
  setDarkMode(enable: boolean) {
    this.isDarkModeEnabled = enable;
    document.body.classList.toggle('dark', enable);
  }
}
