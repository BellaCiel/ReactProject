import React from 'react';

interface Seat {
  id: number;
  x: number;
  y: number;
  seatNumber: string;
  reserved: boolean;
  remainingTime: number;
}

interface SeatItemProps {
  seat: Seat;
  onClick: () => void;
}

const SeatItem: React.FC<SeatItemProps> = ({ seat, onClick }) => {
  const steppedTime = Math.ceil(seat.remainingTime / 5) * 5;
  const fillPercentage = seat.reserved ? (steppedTime / 60) * 100 : 0;

  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: `${seat.x}px`,
        top: `${seat.y}px`,
        width: '65px',
        height: '65px',
        border: seat.reserved ? '2px solid #8e24aa' : '2px solid #43a047',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
      }}
    >
      {seat.reserved && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: `${fillPercentage}%`,
            background: 'linear-gradient(to top, #9c27b0, #ba68c8)',
            transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1,
          }}
        />
      )}

      <span
        style={{
          zIndex: 2,
          fontWeight: '700',
          fontSize: '15px',
          color: seat.reserved ? '#ffffff' : '#2e7d32',
          textShadow: seat.reserved ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
        }}
      >
        {seat.seatNumber}
      </span>
      
      {seat.reserved && (
        <span
          style={{
            zIndex: 2,
            fontSize: '11px',
            color: '#ffffff',
            marginTop: '2px',
            opacity: 0.9,
          }}
        >
          {seat.remainingTime}초
        </span>
      )}
    </div>
  );
};

export default SeatItem;