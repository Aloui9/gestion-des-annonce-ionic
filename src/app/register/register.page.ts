import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/services/theme.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  isDarkMode: boolean;
  darkModeIcon: string = 'moon';
  darkModeLabel: string = 'Dark Mode';

  firstName: string = '';
  lastName: string = '';
  password: string = '';
  email: string = '';
  formValidity = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  private updateDarkModeButton() {
    // Update dark mode icon and label based on the current mode
    this.darkModeIcon = this.themeService.isDarkMode() ? 'sunny' : 'moon';
    this.darkModeLabel = this.themeService.isDarkMode() ? 'Light Mode' : 'Dark Mode';
  }

  toggleDarkMode() {
    // Toggle the dark mode when the button is clicked
    this.themeService.setDarkMode(!this.themeService.isDarkMode());
    this.updateDarkModeButton();
  }

  register() {
    // Create a new user object with the provided information
    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };

    // Check if the user input is valid before attempting to register
    if (
      newUser.firstName.trim().length > 0 &&
      newUser.lastName.trim().length > 0 &&
      newUser.email.trim().length > 0 &&
      newUser.password.length > 0
    ) {
      // Call the user service to add the new user
      this.userService.addUser(newUser).subscribe({
        next: (response) => {
          // Navigate to the login page after successful registration
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
