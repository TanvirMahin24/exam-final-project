import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface Props {
  duration: number;
  func: () => void;
}
const Counter = ({ duration, func }: Props) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const children = ({ remainingTime }: any) => {
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    if (remainingTime === 0) {
      if (!submitted) {
        func();
        setSubmitted(true);
      }
    }
    return `${minutes}:${seconds}`;
  };
  return (
    <div>
      <CountdownCircleTimer
        isPlaying
        size={100}
        duration={duration - 7}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 50, 20, 0]}
      >
        {children}
      </CountdownCircleTimer>
    </div>
  );
};

export default Counter;
