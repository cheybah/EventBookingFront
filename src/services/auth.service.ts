import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Laravel API base URL

  constructor(private http: HttpClient) {}

  // Register a new client
  registerClient(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/client/register`, userData, { headers });
  }

  // Login client/admin
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role); // Save the role
        localStorage.setItem('userId', response.user.id); // Save the user ID
        console.log('User ID stored:', response.user.id); // Add this line for debugging
      })
    );
  }

  // Get the logged-in user
  getUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/user/${id}`;
    return this.http.get<User>(url);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }
}




