
export interface Event {
  id?: number;
  name: string;
  description?: string;
  category: string;
  event_date: string;
  booked_seats?: number,
  available_seats: number;
  img: string;
}
