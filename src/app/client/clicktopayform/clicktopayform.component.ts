import { Component } from '@angular/core';
import { BookingService } from 'src/services/booking.service';
import { EventService } from 'src/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';

declare let Email: any;

@Component({
  selector: 'app-clicktopayform',
  templateUrl: './clicktopayform.component.html',
  styleUrls: ['./clicktopayform.component.css']
})
export class ClicktopayformComponent {

  paymentForm: FormGroup;
  event: any;
  user: any;

  constructor(    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ){

    {
      this.paymentForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        seats: [1, [Validators.required, Validators.min(1)]],
        saveInfo: [false],
        paymentMethod: ['credit', Validators.required],
        ccName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
        ccNumber: ['', [Validators.required, Validators.pattern('\\d{16}')]],
        ccExpiration: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/\\d{2}$')]],
        ccCvv: ['', [Validators.required, Validators.pattern('\\d{3}')]]
      });
    }
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(Number(eventId)).subscribe(event => {
      this.event = event;
    });

    const userId = 1; // Replace with the actual user ID
    this.authService.getUser(userId).subscribe(user => {
      this.user = user;
      this.paymentForm.patchValue({ name: user.name });
    });
  }

  submitForm(): void {
    if (this.paymentForm.invalid) {
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to proceed with the payment?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.processPayment();
      }
    });
  }

  processPayment(): void {
    const seats = this.paymentForm.value.seats;
    if (seats > this.event.available_seats - this.event.booked_seats) {
      alert('Not enough available seats');
      return;
    }

    // Process payment here (e.g., using a payment gateway API)

    // Create booking
    const booking = {
      event_id: this.event.id,
      client_name: this.paymentForm.value.name,
      seats_reserve: seats
    };

    this.bookingService.createBooking(booking).subscribe(() => {
      this.sendMail();
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Your booking has been confirmed!',
        confirmButtonColor: '#B48F44',
        timer: 3000
      }).then(() => {
        this.router.navigate(['/client/dashboard']);
      });
    });
  }

  sendMail(): void {
  let emailbody = `<h2>Thank you for booking with Sona!</h2>
                      <br> This is your confirmation receipt for the event ${this.event.name}
                      <br> Event Date: ${new Date(this.event.event_date).toLocaleDateString()}`;

    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "cheymabahroun@gmail.com",
      Password: "2AE8FE0BC29A65363DE1866214A384F9B549",
      Port: "2525",
      To: this.paymentForm.value.email,
      From: "cheymabahroun@gmail.com",
      Subject: "Sona Booking Receipt",
      Body: emailbody,
    }).then(
      (message: string) => {
        if (message === "OK") {
          console.log("Email sent successfully");
        } else {
          console.error("Failed to send email:", message);
        }
      }
    );
  }
}
