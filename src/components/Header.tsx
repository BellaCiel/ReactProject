import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { seats } = useApp();
  const navigate = useNavigate();

  const availableSeats = seats.filter((seat) => !seat.reserved).length;
  const totalSeats = seats.length;

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 40px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
        borderBottom: '1px solid #f1f3f5',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <h2
          onClick={() => navigate('/')}
          style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '800',
            color: '#1a1a1a',
            cursor: 'pointer',
            letterSpacing: '-0.5px',
          }}
        >
          인덕대학교 도서관
        </h2>
        <div
          style={{
            backgroundColor: '#e8f5e9',
            color: '#2e7d32',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '700',
          }}
        >
          정원 현황 : {availableSeats} / {totalSeats}석 사용 가능
        </div>
      </div>

    </header>
  );
};

export default Header;