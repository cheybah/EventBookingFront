import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SeperatorComponent } from './seperator/seperator.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {path: 'sep', component: SeperatorComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
