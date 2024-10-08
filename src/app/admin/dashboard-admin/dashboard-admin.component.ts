import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { User } from 'src/app/models/User';
import { Event } from 'src/app/models/Event';
import * as bootstrap from 'bootstrap';
import { EventService } from 'src/services/event.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Import FormBuilder and FormGroup



@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: ''};

    userEvents: Event[]= [];
    eventForm: FormGroup;
    eventEditForm: FormGroup;
    fileName: string | null = null;
    categories = [
      { id: 'categoryFestival', value: 'Festival', label: 'Festival' },
      { id: 'categoryConcert', value: 'Concert', label: 'Concert' },
      { id: 'categoryProfessional', value: 'Professional', label: 'Professional' },
      { id: 'categoryNature', value: 'Nature', label: 'Nature' },
      { id: 'categoryNetworking', value: 'Networking', label: 'Networking' },
      { id: 'categoryOutdoor', value: 'Outdoor', label: 'Outdoor' },
    ];

    selectedEvent: Event = {
      id: 0,
      name: '',
      description: '',
      category: '',
      event_date: '',
      booked_seats: 0,
      available_seats: 0,
      img: '',
    };


constructor(private router: Router,
  private formBuilder: FormBuilder,
  private eventService: EventService

){
  this.eventForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [null, Validators.required],
    category: [null, Validators.required],
    event_date: ['', [Validators.required, Validators.min(1)]],
    available_seats: ['', Validators.required],
    img: [''],
  });
  this.eventEditForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [null, Validators.required],
    category: [null, Validators.required],
    event_date: ['', [Validators.required, Validators.min(1)]],
    available_seats: ['', Validators.required],
    img: ['']
  });
}

ngOnInit(): void {
  this.getEvents();
}

getEvents(): void {
  this.eventService.getEvents().subscribe(events => {
    this.userEvents = events;
  });
}

scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
goToCreateEvent(): void {
  this.scrollToSection('formevent');
}

displayEvent(event: Event): void {
  console.log("this is display event",event);
  this.selectedEvent = event;
  const modalElement = document.getElementById('eventModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
OpenEditEvent(event: Event): void {
  console.log("this is update event",this.selectedEvent);

  this.selectedEvent = { ...event };

  this.eventEditForm.setValue({
    name: event.name,
    description: event.description,
    category: event.category,
    event_date: event.event_date,
    available_seats: event.available_seats,
    img: event.img || ''
  });
  const modalElement = document.getElementById('editEventModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}

deleteEvent(event: Event): void {
  // Set the selected event for deletion
  this.selectedEvent = event;

  // Open the confirmation modal
  const deleteModalElement = document.getElementById('deleteModal');
  if (deleteModalElement) {
    const deleteModal = new bootstrap.Modal(deleteModalElement);
    deleteModal.show();
  }
}

updateEvent(): void {

  const formValues = this.eventEditForm.value;

    // Update the selectedPot object
  this.selectedEvent.name = formValues.name;
  this.selectedEvent.category = formValues.category;
  this.selectedEvent.available_seats = formValues.available_seats;
  this.selectedEvent.event_date = formValues.event_date;
  this.selectedEvent.description = formValues.description;
  // Open the confirmation modal
  const confirmationModalElement = document.getElementById('confirmationModal');
  if (confirmationModalElement) {
    const confirmationModal = new bootstrap.Modal(confirmationModalElement);
    confirmationModal.show();
  }
}

onSubmitEvent() {
  console.log('onSubmitEvent', this.eventForm.value);
  if (this.eventForm.valid) {
    const newP = {
      name: this.eventForm.value.name,
      description: this.eventForm.value.description,
      category: this.eventForm.value.category,
      event_date: this.formatDate(new Date()), // Format the date correctly, gave me a headache for no reason
      available_seats: this.eventForm.value.available_seats,
      img: this.fileName ? `assets/img/${this.fileName}` : ''  // Set the img property to the static path
    };

    this.eventService.createEvent(newP).subscribe((event) => {
      console.log('event added successfully', newP);
      this.scrollToSection('listofevents');
      // Refresh the list of events
      this.getEvents();
    });
  } else {
    this.markFormGroupTouched(this.eventForm);
  }
}

formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

private markFormGroupTouched(formGroup: FormGroup) {
  (Object as any).values(formGroup.controls).forEach((control: any) => {
    control.markAsTouched();

    if (control.controls) {
      this.markFormGroupTouched(control);
    }
  });
}

onFileChange(event: any) {
  const file = event.target.files[0];
  if (file) {
      this.fileName = file.name; // Store the file name
  }
}

confirmUpdate(): void {
  // Call the actual update function
  this.eventService.updateEvent(this.selectedEvent.id!, this.selectedEvent).subscribe(() => {
    console.log('Event updated successfully');
    this.getEvents();

    // Hide the edit modal
    const editModalElement = document.getElementById('editEventModal');
    if (editModalElement) {
      const editModal = new bootstrap.Modal(editModalElement);
      editModal.hide();
    }
  });
}

confirmDelete(): void {
  // Call the actual delete function
  if (this.selectedEvent && this.selectedEvent.id !== undefined) {
    this.eventService.deleteEvent(this.selectedEvent.id).subscribe(() => {
      console.log('Event deleted successfully');
      this.getEvents();
    });
  }
  // Close the confirmation modal
  const deleteModalElement = document.getElementById('deleteModal');
  if (deleteModalElement) {
    const deleteModal = new bootstrap.Modal(deleteModalElement);
    deleteModal.hide();
  }
}

minDate(): string {
  // Get the current date
  const currentDate = new Date();

  // Format the date as "YYYY-MM-DD"
  const formattedDate = currentDate.toISOString().split('T')[0];

  return formattedDate;
}

calculateProgress(event: any): string {
  const progress = ( event.booked_seats / event.available_seats) * 100;
  return progress + '%';
}

isTitleCategoryDisabled(): boolean {
  // Return 'true' if the form is in edit mode, otherwise 'false'
  return !!this.selectedEvent.id;
}

goToHome(): void {
  this.router.navigate(['/home']);
}
logOut(): void {
  this.router.navigate(['/login']);
}
}
