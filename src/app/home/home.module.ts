import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ServicesComponent } from './services/services.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { EventsComponent } from './events/events.component';


@NgModule({
  declarations: [
    HomepageComponent,
    TopbarComponent,
    AboutusComponent,
    ServicesComponent,
    FooterComponent,
    BlogComponent,
    EventsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
