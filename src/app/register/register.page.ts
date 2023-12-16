// register.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  email:string = '';
  formValidity = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  private updateDarkModeButton() {
    this.darkModeIcon = this.themeService.isDarkMode() ? 'sunny' : 'moon';
    this.darkModeLabel = this.themeService.isDarkMode() ? 'Light Mode' : 'Dark Mode';
  }


  toggleDarkMode() {
    this.themeService.setDarkMode(!this.themeService.isDarkMode());
    this.updateDarkModeButton();
  } 


  register() {
    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email:this.email,
      password: this.password
    };
    if (newUser.firstName.trim().length > 0 && newUser.lastName.trim().length > 0 && newUser.email.trim().length > 0 &&  newUser.password.length > 0) {
      this.userService.addUser(newUser).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

}