import { useEffect, useRef, useState } from 'react';
import { FormatTime } from '../ui/FormatTime';
import './Timer.css';

// interface TimerProps {

// }

export const Timer = () => {

  const [time, setTime] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(p => p + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <FormatTime seconds={time} showHour />
    </div>
  )
}