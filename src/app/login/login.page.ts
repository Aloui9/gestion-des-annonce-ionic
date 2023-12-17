import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ThemeService } from 'src/services/theme.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Properties for dark mode
  isDarkMode: boolean;
  darkModeIcon: string = 'moon';
  darkModeLabel: string = 'Dark Mode';

  // Input fields for username and password
  username: string = '';
  password: string = '';

  // Users data
  users: any;

  constructor(
    private userService: UserService,
    private themeService: ThemeService,
    private toastController: ToastController,
    private router: Router
  ) {
    // Initialize dark mode based on user preferences
    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
    console.log("Login page initialized");
  }

  // Update dark mode button based on user preferences
  private updateDarkModeButton() {
    this.darkModeIcon = this.themeService.isDarkMode() ? 'sunny' : 'moon';
    this.darkModeLabel = this.themeService.isDarkMode() ? 'Light Mode' : 'Dark Mode';
  }

  // Toggle dark mode when the user clicks the dark mode button
  toggleDarkMode() {
    this.themeService.setDarkMode(!this.themeService.isDarkMode());
    this.updateDarkModeButton();
  }

  // Attempt to log in the user
  async login() {
    try {
      // Check if the user exists in the database
      this.userService.doesUserExist(this.username, this.password).subscribe({
        next: (response) => {
          if (response) {
            // User exists, save email in local storage and navigate to the home page
            localStorage.setItem('userEmail', this.username);
            this.username = '';
            this.password = '';
            this.router.navigate(['/']);
          } else {
            // User does not exist, display an alert toast
            this.presentToast('Invalid credentials. Please try again.');
          }
        },
        error: (error) => {
          console.error('Error checking user existence:', error);
          this.presentToast('An error occurred. Please try again.');
        }
      });
    } catch (error) {
      console.error('Error in login:', error);
      this.presentToast('An error occurred. Please try again.');
    }
  }

  // Display a toast message
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Display for 3 seconds
      position: 'top',
      color: 'danger' // You can customize the color
    });
    toast.present();
  }
}
