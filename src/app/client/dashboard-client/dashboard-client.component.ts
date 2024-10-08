import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit {

  userId: number = 0;
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: '',
    password_confirmation: ''
  };

  constructor(private authService: AuthService,
    private router: Router
  ) { }


ngOnInit(): void {
    // Assuming you are storing the user ID in localStorage after login
    const userIdStr = localStorage.getItem('userId');
    this.userId = userIdStr ? Number(userIdStr) : 0;

    if (this.userId) {
      this.authService.getUser(this.userId).subscribe(
        (data: User) => {
          this.user = data;
          console.log(data);
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }



  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/client/login']);
  }
}
