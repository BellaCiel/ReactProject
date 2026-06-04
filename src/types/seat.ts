export interface Seat {
  id: number;
  x: number;
  y: number;
  seatNumber: string;
  reserved: boolean;
  remainingTime: number;
}

export interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
}