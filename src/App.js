import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isRunning && timeLeft === 0) {
     const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
     
      audio.play();
      setIsSession((prev) => !prev);
      setTimeLeft((isSession ? breakLength : sessionLength) * 60);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isSession, breakLength, sessionLength]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsSession(true);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="app">
      <h1>Pomodoro Timer ⏳</h1>

      <div className="length-settings">
        <div>
          <h3>Break Length</h3>
          <button onClick={() => breakLength > 1 && setBreakLength(breakLength - 1)}>-</button>
          <span>{breakLength}</span>
          <button onClick={() => setBreakLength(breakLength + 1)}>+</button>
        </div>
        <div>
          <h3>Session Length</h3>
          <button onClick={() => sessionLength > 1 && setSessionLength(sessionLength - 1)}>-</button>
          <span>{sessionLength}</span>
          <button onClick={() => setSessionLength(sessionLength + 1)}>+</button>
        </div>
      </div>

      <div className="timer">
        <h2>{isSession ? "Session" : "Break"}</h2>
        <h1>{formatTime(timeLeft)}</h1>
        <div className="controls">
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
