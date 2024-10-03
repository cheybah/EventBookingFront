import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.css']
})
export class SignupClientComponent {
  signupError: boolean = false;  // Define signupError here
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';

constructor(
  private router: Router,
  private fb: FormBuilder,
  private authService: AuthService
) {

  }

  signUp(): void {
    console.log('SignUp triggered');  // Add this for debugging

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    };

    this.authService.registerClient(userData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.goToHome();  // Redirect after successful registration
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.signupError = true;
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

}
