import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.css']
})
export class SignupClientComponent {
  signupError: boolean = false;  // Define signupError here
  signupForm: FormGroup;


constructor(
  private router: Router,
  private fb: FormBuilder
) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });

  }

  signUp(): void {
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
