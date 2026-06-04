import React from 'react';
import { useApp } from '../context/AppContext';
import SeatItem from './SeatItem';
import { type Seat } from '../types/seat';

interface SeatGridProps {
  onSeatClick: (seat: Seat) => void;
}

const SeatGrid: React.FC<SeatGridProps> = ({ onSeatClick }) => {
  const { seats } = useApp();

  return (
    <div
      style={{
        position: 'relative',
        width: '600px',
        height: '450px',
        margin: '0 auto',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
        padding: '20px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '135px',
          top: '50px',
          width: '110px',
          height: '88px',
          backgroundColor: '#e9ecef',
          borderRadius: '10px',
          border: '1px solid #dee2e6',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="/sub1.jpg"
          alt="도서관 서브 전경 1"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: '135px',
          top: '148px',
          width: '110px',
          height: '87px',
          backgroundColor: '#e9ecef',
          borderRadius: '10px',
          border: '1px solid #dee2e6',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="/sub2.jpg"
          alt="도서관 서브 전경 2"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: '255px',
          top: '50px',
          width: '280px',
          height: '185px',
          backgroundColor: '#e9ecef',
          borderRadius: '12px',
          border: '1px solid #dee2e6',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="/main.jpg"
          alt="도서관 메인 전경"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          right: '25px',
          bottom: '15px',
          fontSize: '12px',
          color: '#495057',
          backgroundColor: '#ffffff',
          padding: '8px 12px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          display: 'flex',
          gap: '12px',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#ffffff', border: '2px solid #43a047', borderRadius: '3px' }} />
          <span>이용 가능</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', background: 'linear-gradient(to top, #9c27b0, #ba68c8)', borderRadius: '3px' }} />
          <span>예약됨</span>
        </div>
      </div>

      {seats.map((seat) => (
        <SeatItem key={seat.id} seat={seat} onClick={() => onSeatClick(seat)} />
      ))}
    </div>
  );
};

export default SeatGrid;