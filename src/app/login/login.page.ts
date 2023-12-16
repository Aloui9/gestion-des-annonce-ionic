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
  isDarkMode: boolean;
  darkModeIcon: string = 'moon';
  darkModeLabel: string = 'Dark Mode';
  username: string = '';
  password: string = '';
  users: any;

  constructor(
    private userService: UserService,
    private themeService: ThemeService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.isDarkMode = this.themeService.isDarkMode();
  }


  ngOnInit(): void {
    console.log("Login");
  }

  private updateDarkModeButton() {
    this.darkModeIcon = this.themeService.isDarkMode() ? 'sunny' : 'moon';
    this.darkModeLabel = this.themeService.isDarkMode() ? 'Light Mode' : 'Dark Mode';
  }


  toggleDarkMode() {
    this.themeService.setDarkMode(!this.themeService.isDarkMode());
    this.updateDarkModeButton();
  }

  async login() {
    try {
      // Check if the user exists in the database
      this.userService.doesUserExist(this.username, this.password).subscribe({
        next: (response) => {
          if (response) {
            // User exists, save email in local storage or perform additional actions
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
