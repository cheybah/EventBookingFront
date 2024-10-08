import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/services/event.service';
import { Event } from 'src/app/models/Event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: Event | undefined;

  constructor(private router: Router,
    private eventService: EventService,
    private route: ActivatedRoute,
  ) {}


    ngOnInit(): void {
      this.getEvent();
    }

    getEvent(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.eventService.getEvent(id).subscribe(event => this.event = event);
    }

    calculateProgress(event: any): string {
      const progress = ( event.booked_seats / event.available_seats) * 100;
      return progress + '%';
    }

    redirectToClickToPay(): void {
      const eventId = this.route.snapshot.paramMap.get('id');
      this.router.navigate([`/client/event/${eventId}/booking`]);
    }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/client/login']);
  }
}
