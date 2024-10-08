import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/services/event.service';
import { Event } from 'src/app/models/Event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = []; // Declare an array to hold your events

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.getEvents(); // Fetch events on component initialization
    console.log(this.events);
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data; // Populate the events array
    }, error => {
      console.error('Error fetching events:', error);
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists to see which route we're gonna go
  }
}
