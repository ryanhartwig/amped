import { useEffect, useRef } from 'react';
import { FormatTime } from '../ui/FormatTime';
import './Timer.css';

interface TimerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  time: number,
  setTime: React.Dispatch<React.SetStateAction<number>>,
  showHour?: boolean,
  className?: string,
}

export const Timer = ({time, setTime, showHour = false, ...props}: TimerProps) => {
  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(p => p + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [setTime]);

  return (
    <div {...props}>
      <FormatTime seconds={time} showHour={showHour} />
    </div>
  )
}