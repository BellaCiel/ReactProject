import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isPortalLoggedIn, portalUser, loginPortal, registerPortal, logoutPortal } = useApp();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [idInput, setIdInput] = useState('');
  const [passInput, setPassInput] = useState('');

  const handleActionClick = () => {
    if (isPortalLoggedIn) {
      navigate('/seat');
    } else {
      setAuthMode('login');
      setIsModalOpen(true);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      if (loginPortal(idInput, passInput)) {
        alert('로그인에 성공했습니다! 좌석 예약 페이지로 이동합니다.');
        setIsModalOpen(false);
        setIdInput('');
        setPassInput('');
        navigate('/seat');
      } else {
        alert('존재하지 않는 계정이거나 비밀번호가 일치하지 않습니다.');
      }
    } else {
      if (registerPortal(idInput, passInput)) {
        alert('회원가입이 완료되었습니다! 로그인 탭에서 로그인을 진행해 주세요.');
        setAuthMode('login');
        setPassInput('');
      } else {
        alert('이미 존재하는 학생 ID(아이디)입니다.');
      }
    }
  };

  return (
    <div style={{ fontFamily: '"Noto Sans KR", sans-serif', color: '#333', backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      
      {/* 상단 네비게이션 바 */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 40px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#000000', letterSpacing: '-0.5px' }}>
          인덕대학교 도서관
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {isPortalLoggedIn && (
            <span style={{ fontSize: '14px', color: '#555' }}>
              🟢 <strong>{portalUser}</strong>님 접속 중
            </span>
          )}
          <button
            onClick={isPortalLoggedIn ? logoutPortal : () => { setAuthMode('login'); setIsModalOpen(true); }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f1f3f5',
              border: 'none',
              borderRadius: '6px',
              color: '#495057',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {isPortalLoggedIn ? '로그아웃' : '로그인 / 회원가입'}
          </button>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section style={{
        display: 'flex',
        maxWidth: '1200px',
        margin: '40px auto',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        padding: '30px',
        gap: '40px',
        alignItems: 'center'
      }}>
        <div style={{ flex: 1.2 }}>
          <span style={{ color: '#1a73e8', fontWeight: '700', fontSize: '14px', letterSpacing: '1px' }}>WELCOME TO INDUK LIBRARY</span>
          <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '10px 0 20px 0', lineHeight: '1.4', color: '#111' }}>
            지식의 중심, <br />인덕대학교 도서관에 오신 것을 환영합니다.
          </h2>
          <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.7', marginBottom: '25px', textAlign: 'justify' }}>
            인덕대학교 도서관은 학생들의 학습과 연구를 지원하는 지식의 중심지입니다. 
            층별로 세분화된 맞춤형 시설(열람실, 만화/멀티미디어 자료실, 메이커 스페이스 등)을 제공하며, 
            캠퍼스 내외에서 편리하게 전자책과 학술 자료를 이용할 수 있는 디지털 도서관 서비스를 운영하고 있습니다.
          </p>
          <button
            onClick={handleActionClick}
            style={{
              padding: '12px 24px',
              backgroundColor: '#1a73e8',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(26, 115, 232, 0.3)',
            }}
          >
            {isPortalLoggedIn ? '좌석 예약 시스템 진입하기 →' : '로그인 후 좌석 예약하기 🔒'}
          </button>
        </div>
        <div style={{ flex: 1, height: '280px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
          <img 
            src="/main.jpg" 
            alt="인덕대학교 전경" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </section>

      {/* 층별 안내 섹션 */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 40px auto' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', paddingLeft: '5px', borderLeft: '4px solid #1a73e8' }}>
          운영 시간 및 층별 안내
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', borderTop: '4px solid #4caf50' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '700', color: '#2e7d32' }}>1층 | 아이리스 플랫폼 (Iris Platform)</h4>
            <p style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#e67e22', fontWeight: '700' }}>⏱️ 이용시간: 07:00 ~ 22:00 (학기/방학 동일)</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
              쾌적하고 자율적인 학습 공간이 조성되어 있어 언제든 편안하게 방문하여 집중할 수 있는 개방형 열람 플랫폼입니다.
            </p>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', borderTop: '4px solid #9c27b0' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '700', color: '#7b1fa2' }}>2층 | 인포커먼스 큐브 & 메이커 큐브</h4>
            <p style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#e67e22', fontWeight: '700' }}>⏱️ 이용시간: 09:00 ~ 18:00 (학기 중)</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
              만화 자료(1만 3천여 권), 멀티미디어 자료(DVD, CD), 연속간행물, 강의연계도서 등을 자유롭게 열람할 수 있는 멀티플렉스 창의 공간입니다.
            </p>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', borderTop: '4px solid #1a73e8' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '700', color: '#1565c0' }}>3층 | 종합자료열람실</h4>
            <p style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#e67e22', fontWeight: '700' }}>⏱️ 이용시간: 09:00 ~ 18:00 (학기 중)</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
              탁 트인 개방형 구조와 방대한 학술 도서 인프라를 바탕으로, 정숙하고 깊이 있는 학업에 집중할 수 있는 최적의 환경을 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 통합 로그인 / 회원가입 팝업 모달 */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
        }}>
          <div style={{ backgroundColor: '#ffffff', width: '340px', borderRadius: '12px', padding: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', position: 'relative' }}>
            <button 
              onClick={() => { setIsModalOpen(false); setIdInput(''); setPassInput(''); }}
              style={{ position: 'absolute', right: '20px', top: '20px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#aaa', fontWeight: 'bold' }}
            >
              X
            </button>

            {/* 상단 로그인/회원가입 모드 선택 탭 */}
            <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '2px solid #f1f3f5' }}>
              <button 
                onClick={() => setAuthMode('login')}
                style={{ flex: 1, padding: '10px 0', border: 'none', background: 'none', fontSize: '16px', fontWeight: '700', color: authMode === 'login' ? '#1a73e8' : '#aaa', borderBottom: authMode === 'login' ? '2px solid #1a73e8' : 'none', cursor: 'pointer' }}
              >
                로그인
              </button>
              <button 
                onClick={() => setAuthMode('signup')}
                style={{ flex: 1, padding: '10px 0', border: 'none', background: 'none', fontSize: '16px', fontWeight: '700', color: authMode === 'signup' ? '#1a73e8' : '#aaa', borderBottom: authMode === 'signup' ? '2px solid #1a73e8' : 'none', cursor: 'pointer' }}
              >
                회원가입
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                placeholder="학생 ID (학번 또는 아이디)"
                value={idInput}
                onChange={(e) => setIdInput(e.target.value)}
                style={{ padding: '12px', borderRadius: '6px', border: '1px solid #dee2e6', fontSize: '14px' }}
                required
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                style={{ padding: '12px', borderRadius: '6px', border: '1px solid #dee2e6', fontSize: '14px' }}
                required
              />
              <button
                type="submit"
                style={{ padding: '12px', backgroundColor: '#1a73e8', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', marginTop: '10px' }}
              >
                {authMode === 'login' ? '로그인 완료' : '회원 계정 등록'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;