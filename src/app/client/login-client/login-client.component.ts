import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

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
      private authService: AuthService
    ) { }

    signIn(): void {
        if (this.email && this.password) {
          const credentials = {
            email: this.email,
            password: this.password
          };

          this.authService.login(credentials).subscribe(
            response => {
              console.log('Login successful', response);

              // Check if the role exists in the response and store it
              if (response.user && response.user.role) {
                localStorage.setItem('userRole', response.user.role);
              } else {
                console.error('Role not found in the response');
              }


              this.router.navigate(['/home']); // Navigate to home or another route on success
            },
            error => {
              console.error('Login failed', error);

              this.authenticationError = true; // Show error message
            }
          );
        }
      }


    goToHome(): void {
      this.router.navigate(['/home']);
    }

  }
