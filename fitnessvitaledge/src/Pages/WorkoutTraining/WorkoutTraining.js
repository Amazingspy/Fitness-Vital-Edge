import React, { useState, useEffect } from 'react';
import './WorkoutTraining.css';

function WorkoutTraining() {
  // Timer State
  const [workoutTime, setWorkoutTime] = useState(60); // Default workout time (in seconds)
  const [intervalTime, setIntervalTime] = useState(30); // Default interval time (in seconds)
  const [timeLeft, setTimeLeft] = useState(workoutTime); // Countdown timer
  const [isRunning, setIsRunning] = useState(false); // Timer state (running or paused)
  const [isInterval, setIsInterval] = useState(false); // Tracks if it's interval time

  // Timer Logic
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      if (isInterval) {
        setTimeLeft(workoutTime); // Switch back to workout time
        setIsInterval(false);
      } else {
        setTimeLeft(intervalTime); // Switch to interval time
        setIsInterval(true);
      }
    } else {
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft, workoutTime, intervalTime, isInterval]);

  // Start/Stop Timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Reset Timer
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(workoutTime);
    setIsInterval(false);
  };

  const circumference = 2 * Math.PI * 85;
  const progress = isInterval
    ? ((timeLeft / intervalTime) * circumference).toFixed(2)
    : ((timeLeft / workoutTime) * circumference).toFixed(2);


  return (
    <div className="workout-training-page">
      <div className="video-container">
        <div className="video">
          <h2>Workout Tutorial Video</h2>
          {/* Embed your video or video player here */}
        </div>
      </div>


      <div className="timer-container">
        <div className="timer">
          <div className="segmented-timer">
            <svg viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="#eee"
                strokeWidth="15"
                fill="none"
              />
              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="#007bff"
                strokeWidth="15"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
              <text x="100" y="100" textAnchor="middle" dy="8" fontSize="24" fill="#333">
                {`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}
              </text>
            </svg>
          </div>

          <div className="timer-display">
            <h3>{isInterval ? 'Interval Time' : 'Workout Time'}</h3>
            <h1>{`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}</h1>
          </div>
          <div className="timer-controls">
            <button onClick={toggleTimer} className="timer-button">
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={resetTimer} className="timer-button reset">Reset</button>
          </div>
          <div className="timer-settings">
            <label>
              <span>Workout Time (sec):</span>
              <input
                type="number"
                value={workoutTime}
                onChange={(e) => setWorkoutTime(parseInt(e.target.value) || 0)}
              />
            </label>
            <label>
              <span>Interval Time (sec):</span>
              <input
                type="number"
                value={intervalTime}
                onChange={(e) => setIntervalTime(parseInt(e.target.value) || 0)}
              />
            </label>
          </div>

        </div>
      </div>


      <div className="scheduler-container">
        <div className="scheduler">
          <h2>Set, Count Scheduler</h2>
          {/* Set and count controls here */}
        </div>
      </div>


      <div className="footer-container">
        <div className="footer">
        </div>
      </div>
    </div>
  );
}

export default WorkoutTraining;
