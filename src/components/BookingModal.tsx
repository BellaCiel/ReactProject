import React, { useState, useEffect } from 'react';

interface Seat {
  id: number;
  x: number;
  y: number;
  seatNumber: string;
  reserved: boolean;
  remainingTime: number;
}

interface BookingModalProps {
  seat: Seat;
  mode: 'reserve' | 'cancel';
  onClose: () => void;
  onSubmit: (id: string, pass: string) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ seat, mode, onClose, onSubmit }) => {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    setId('');
    setPass('');
  }, [seat, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(id, pass);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '320px',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        position: 'relative',
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#aaa',
            fontWeight: 'bold'
          }}
        >
          X
        </button>

        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '700', color: '#111' }}>
          {mode === 'reserve' ? `좌석 예약 - ${seat.seatNumber}` : `예약 취소 - ${seat.seatNumber}`}
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="학생 ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ padding: '11px', borderRadius: '6px', border: '1px solid #dee2e6', fontSize: '14px', outline: 'none' }}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={{ padding: '11px', borderRadius: '6px', border: '1px solid #dee2e6', fontSize: '14px', outline: 'none' }}
            required
          />
          <button
            type="submit"
            style={{
              padding: '12px',
              backgroundColor: mode === 'reserve' ? '#1a73e8' : '#d32f2f',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              marginTop: '6px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
            }}
          >
            {mode === 'reserve' ? '예약하기' : '취소하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;