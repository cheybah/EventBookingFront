import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import ('./home/home.module').then(m=> m.HomeModule)},
  { path: 'home', loadChildren: () => import ('./home/home.module').then(m=> m.HomeModule)},
  { path: 'login-client', loadChildren: () => import ('./client/client.module').then(m=> m.ClientModule)},
  { path: 'login-admin', loadChildren: () => import ('./admin/admin.module').then(m=> m.AdminModule)},
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
