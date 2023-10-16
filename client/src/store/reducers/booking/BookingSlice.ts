import { Trip } from '../../../../../../../bsa/lecture-starter-react/travel-app/src/store/reducers/trip/TripSlice';

export interface Booking {
  id: string;
  tripId: string;
  userId: string;
  guests: number;
  totalPrice: number;
  date: string;
  createdAt: string;
  trip: Trip;
}
