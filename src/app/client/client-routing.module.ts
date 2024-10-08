import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginClientComponent } from './login-client/login-client.component';
import { SignupClientComponent } from './signup-client/signup-client.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ClicktopayformComponent } from './clicktopayform/clicktopayform.component';

const routes: Routes = [
  { path: 'login', component: LoginClientComponent },
  { path: 'signup', component: SignupClientComponent},
  { path: 'dashboard', component: DashboardClientComponent},
  { path: 'event/:id', component: EventDetailsComponent},
  { path: 'event/:id/booking', component: ClicktopayformComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
