import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginClientComponent } from './login-client/login-client.component';
import { SignupClientComponent } from './signup-client/signup-client.component';

const routes: Routes = [
  { path: 'login', component: LoginClientComponent },
  { path: 'signup', component: SignupClientComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
