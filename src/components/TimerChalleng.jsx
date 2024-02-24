import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

export default function TimerChalleng({ title, targetTime }) {
  const [timeRemining, setTimeRemining] = useState(targetTime * 1000);
  const timeIsActive = timeRemining > 0 && timeRemining < targetTime * 1000;

  const dialog = useRef();
  const timer = useRef(); // Move the declaration here

  if (timeRemining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }
  function handleReset() {
    setTimeRemining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemining((prevTimeRemining) => prevTimeRemining - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemining}
        onReset={handleReset}
        result="lost"
      />
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} seconds{targetTime > 1 ? 'S' : ' '}
        </p>
        <p>
          <button onClick={timeIsActive ? handleStop : handleStart}>{timeIsActive ? 'stop' : 'start'} challeng</button>
        </p>
        <p className={timeIsActive ? 'active' : undefined}>{timeIsActive ? 'Timer is runnin...' : 'Timer inactive'}</p>
      </section>
    </>
  );
}
