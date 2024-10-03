import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { LoginClientComponent } from './login-client/login-client.component';
import { HomeModule } from "../home/home.module";
import { SignupClientComponent } from './signup-client/signup-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginClientComponent,
    SignupClientComponent
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
