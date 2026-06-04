import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import SeatPage from './pages/SeatPage';
import ErrorPage from './pages/ErrorPage';

const App: React.FC = () => {
  return (
    // 1. 최상단에서 전역 데이터 Context 주입
    <AppProvider>
      {/* 2. 리액트 라우터를 이용한 멀티 URL 화면 구현 (요구사항 충족) */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/seat" element={<SeatPage />} />
          {/* 지정된 경로 외 잘못된 모든 URL 접근은 ErrorPage로 리다이렉트 */}
          <Route path="/Error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} /> 
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;