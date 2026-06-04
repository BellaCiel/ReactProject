import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Seat } from '../types/seat';

interface UserAccount {
  id: string;
  pass: string;
}

interface AppContextType {
  seats: Seat[];
  isPortalLoggedIn: boolean;
  portalUser: string | null;
  loginPortal: (id: string, pass: string) => boolean;
  registerPortal: (id: string, pass: string) => boolean;
  logoutPortal: () => void;
  reserveSeat: (seatId: number, id: string, pass: string) => boolean;
  cancelReservation: (seatId: number, id: string, pass: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialSeats: Seat[] = [
  { id: 1, x: 50, y: 50, seatNumber: 'A1', reserved: false, remainingTime: 60 },
  { id: 2, x: 50, y: 120, seatNumber: 'A2', reserved: false, remainingTime: 60 },
  { id: 3, x: 50, y: 190, seatNumber: 'A3', reserved: false, remainingTime: 60 },
  { id: 4, x: 50, y: 260, seatNumber: 'A4', reserved: false, remainingTime: 60 },
  { id: 5, x: 50, y: 330, seatNumber: 'A5', reserved: false, remainingTime: 60 },
  { id: 6, x: 190, y: 260, seatNumber: 'B1', reserved: false, remainingTime: 60 },
  { id: 7, x: 260, y: 260, seatNumber: 'B2', reserved: false, remainingTime: 60 },
  { id: 8, x: 330, y: 260, seatNumber: 'B3', reserved: false, remainingTime: 60 },
  { id: 9, x: 400, y: 260, seatNumber: 'B4', reserved: false, remainingTime: 60 },
  { id: 10, x: 470, y: 260, seatNumber: 'B5', reserved: false, remainingTime: 60 },
  { id: 11, x: 190, y: 330, seatNumber: 'B6', reserved: false, remainingTime: 60 },
  { id: 12, x: 260, y: 330, seatNumber: 'B7', reserved: false, remainingTime: 60 },
  { id: 13, x: 330, y: 330, seatNumber: 'B8', reserved: false, remainingTime: 60 },
  { id: 14, x: 400, y: 330, seatNumber: 'B9', reserved: false, remainingTime: 60 },
  { id: 15, x: 470, y: 330, seatNumber: 'B10', reserved: false, remainingTime: 60 },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seats, setSeats] = useState<Seat[]>(initialSeats);
  const [users, setUsers] = useState<UserAccount[]>([{ id: 'admin', pass: '1234' }]);
  const [isPortalLoggedIn, setIsPortalLoggedIn] = useState(false);
  const [portalUser, setPortalUser] = useState<string | null>(null);

  const loginPortal = (id: string, pass: string): boolean => {
    const found = users.find((u) => u.id === id && u.pass === pass);
    if (found) {
      setIsPortalLoggedIn(true);
      setPortalUser(id);
      return true;
    }
    return false;
  };

  const registerPortal = (id: string, pass: string): boolean => {
    const exists = users.some((u) => u.id === id);
    if (exists) return false;
    setUsers((prev) => [...prev, { id, pass }]);
    return true;
  };

  const logoutPortal = () => {
    setIsPortalLoggedIn(false);
    setPortalUser(null);
  };

  const reserveSeat = (seatId: number, id: string, pass: string): boolean => {
    const found = users.find((u) => u.id === id && u.pass === pass);
    if (found) {
      setSeats((prev) =>
        prev.map((seat) =>
          seat.id === seatId ? { ...seat, reserved: true, remainingTime: 60 } : seat
        )
      );
      return true;
    }
    return false;
  };

  const cancelReservation = (seatId: number, id: string, pass: string): boolean => {
    const found = users.find((u) => u.id === id && u.pass === pass);
    if (found) {
      setSeats((prev) =>
        prev.map((seat) =>
          seat.id === seatId ? { ...seat, reserved: false, remainingTime: 60 } : seat
        )
      );
      return true;
    }
    return false;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeats((prevSeats) =>
        prevSeats.map((seat) => {
          if (seat.reserved && seat.remainingTime > 0) {
            return { ...seat, remainingTime: seat.remainingTime - 1 };
          } else if (seat.reserved && seat.remainingTime === 0) {
            return { ...seat, reserved: false, remainingTime: 60 };
          }
          return seat;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider value={{ seats, isPortalLoggedIn, portalUser, loginPortal, registerPortal, logoutPortal, reserveSeat, cancelReservation }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};