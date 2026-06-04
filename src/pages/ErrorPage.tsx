import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ color: 'red' }}>404 Error</h1>
      {/* 예시 화면에 지정된 텍스트를 그대로 반영합니다 */}
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>접속할 수 없는 URL 입니다. </p>
      <button 
        onClick={() => navigate('/')} 
        style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#333', color: '#fff', border: 'none' }}
      >
        Home으로 이동
      </button>
    </div>
  );
};

export default ErrorPage;