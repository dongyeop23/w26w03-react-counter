import { useState, useEffect } from 'react';
import './App.css';

// 작업 시간(25분)과 휴식 시간(5분)을 초 단위로 정의
const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

function App() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME); // 남은 시간 (초)
  const [isRunning, setIsRunning] = useState(false);  // 타이머 실행 여부
  const [isWorkMode, setIsWorkMode] = useState(true);  // 작업 모드 vs 휴식 모드

  useEffect(() => {
    let timer = null;

    // 타이머가 실행 중일 때 1초마다 초 감소
if (isRunning && timeLeft > 0) {
    timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
  } else if (timeLeft === 0) {
    if (isWorkMode) {
      alert('작업 시간이 끝났습니다! 5분간 휴식하세요.');
      setIsWorkMode(false);
      setTimeLeft(BREAK_TIME);
    } else {
      alert('휴식 시간이 끝났습니다! 다시 작업에 집중하세요.');
      setIsWorkMode(true);
      setTimeLeft(WORK_TIME);
    }
    setIsRunning(false);
  }

  return () => {
    if (timer) clearInterval(timer);
  };
}, [isRunning, timeLeft, isWorkMode]);

  // 초(seconds)를 "MM:SS" 형태의 문자열로 변환하는 함수
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // 시작 / 일시정지 토글
  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  // 타이머 리셋
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(isWorkMode ? WORK_TIME : BREAK_TIME);
  };

  // 모드 직접 수동 전환 (작업 <-> 휴식)
  const switchMode = (workMode: boolean) => {
    setIsRunning(false);
    setIsWorkMode(workMode);
    setTimeLeft(workMode ? WORK_TIME : BREAK_TIME);
  };

  return (
    <div className="container">
      <h1>뽀모도로 타이머</h1>
      
      {/* 현재 모드 표시 */}
      <div className="status">
        <h2>{isWorkMode ? '🔥 작업 시간' : '☕ 휴식 시간'}</h2>
      </div>

      {/* 타이머 디스플레이 */}
      <div className="timer-display">
        {formatTime(timeLeft)}
      </div>

      {/* 버튼 영역 */}
      <div className="button-group">
        <button onClick={handleStartStop} className="btn primary">
          {isRunning ? '일시정지' : '시작'}
        </button>
        <button onClick={handleReset} className="btn secondary">
          리셋
        </button>
      </div>

      {/* 모드 전환 선택 버튼 */}
      <div className="mode-toggle">
        <button 
          onClick={() => switchMode(true)} 
          className={isWorkMode ? 'active' : ''}
        >
          작업 모드 (25분)
        </button>
        <button 
          onClick={() => switchMode(false)} 
          className={!isWorkMode ? 'active' : ''}
        >
          휴식 모드 (5분)
        </button>
      </div>
    </div>
  );
}

export default App;