import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SeatGrid from '../components/SeatGrid';
import BookingModal from '../components/BookingModal';
import { useApp } from '../context/AppContext';
import { type Seat } from '../types/seat';

const SeatPage: React.FC = () => {
  const navigate = useNavigate();
  const { isPortalLoggedIn, reserveSeat, cancelReservation } = useApp();
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [modalMode, setModalMode] = useState<'reserve' | 'cancel'>('reserve');

  // 인터셉터 기믹: 메인 포틀 로그인이 안 되어있으면 입장 거부 처리
  if (!isPortalLoggedIn) {
    return (
      <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '150px' }}>
        <h2 style={{ color: '#d32f2f' }}>🔒 보안 시스템 안내</h2>
        <p style={{ color: '#555', fontSize: '15px', margin: '10px 0 20px 0' }}>포틀 로그인이 필요한 시스템입니다. 메인화면에서 인증을 마쳐주세요.</p>
        <button 
          onClick={() => navigate('/')} 
          style={{ padding: '10px 20px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          메인 페이지로 이동
        </button>
      </div>
    );
  }

  const handleSeatClick = (seat: Seat) => {
    setSelectedSeat(seat);
    setModalMode(seat.reserved ? 'cancel' : 'reserve');
  };

  const handleModalSubmit = (id: string, pass: string) => {
    if (!selectedSeat) return;

    if (modalMode === 'reserve') {
      const success = reserveSeat(selectedSeat.id, id, pass);
      if (success) {
        alert(`${selectedSeat.seatNumber}번 좌석 예약이 완료되었습니다.`);
      } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } else {
      const success = cancelReservation(selectedSeat.id, id, pass);
      if (success) {
        alert(`${selectedSeat.seatNumber}번 좌석 예약이 취소되었습니다.`);
      } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    }
    setSelectedSeat(null);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f1f3f5', minHeight: '100vh', paddingBottom: '40px' }}>
      <Header />
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: '10px 0' }}>도서관 좌석 예약 배치도</h3>
          <p style={{ color: '#666', fontSize: '14px' }}>좌석을 클릭하면 안내 팝업창을 통해 예약을 진행하거나 취소할 수 있습니다.</p>
        </div>
        
        <SeatGrid onSeatClick={handleSeatClick} />
      </div>

      {selectedSeat && (
        <BookingModal
          seat={selectedSeat}
          mode={modalMode}
          onClose={() => setSelectedSeat(null)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default SeatPage;