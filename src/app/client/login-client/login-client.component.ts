import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent {
    email = '';
    password = '';
    authenticationError = false; // Add this variable for authentication error


    constructor(
      private router: Router,
      //private authService: AuthService
    ) { }

    signIn(): void {
      /*this.authService.signIn(this.email, this.password).subscribe(users => {
        if (users.length > 0) {
          console.log('User authenticated', users[0].id);
          this.router.navigate(['/dashboard', users[0].id]);
        } else {
          console.log('Invalid email or password');
          // Show an error message
          this.authenticationError = true;
        }
      });*/
    }

    goToHome(): void {
      this.router.navigate(['/home']);
    }

  }
