import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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
      })
    );
  }

  // Get the logged-in user
  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }
}




