import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginAdminComponent } from './register-admin/login-admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { HomeModule } from '../home/home.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginAdminComponent,
    DashboardAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HomeModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
