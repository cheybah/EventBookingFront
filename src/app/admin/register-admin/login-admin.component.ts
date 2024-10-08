import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  isPasswordVisible = false;
  registerForm: FormGroup;


constructor(    private fb: FormBuilder,
  private http: HttpClient,
  private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.http.post('http://localhost:8000/api/admin/register', this.registerForm.value).subscribe(
      response => {
        console.log('Admin registered successfully', response);
        this.router.navigate(['/client/login']);
      },
      error => {
        console.error('Error registering admin', error);
      }
    );
  }
}
