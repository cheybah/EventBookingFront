import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { LoginClientComponent } from './login-client/login-client.component';
import { HomeModule } from "../home/home.module";
import { SignupClientComponent } from './signup-client/signup-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ClicktopayformComponent } from './clicktopayform/clicktopayform.component';



@NgModule({
  declarations: [
    LoginClientComponent,
    SignupClientComponent,
    DashboardClientComponent,
    EventDetailsComponent,
    ClicktopayformComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule

]
})
export class ClientModule { }
