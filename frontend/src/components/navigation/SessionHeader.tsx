import './SessionHeader.css';

import { Logo } from '../ui/Logo';

/* React Icons */
import { useAppSelector } from '../../utility/helpers/hooks';
import { Timer } from '../stats/Timer';
import { FormatTime } from '../ui/FormatTime';

interface SessionheaderProps {
  routineTitle: string,
  time: number,
  setTime: React.Dispatch<React.SetStateAction<number>>,
  paused: boolean,
}

export const SessionHeader = ({routineTitle, paused, time, setTime}: SessionheaderProps) => {

  const { foreground: background } = useAppSelector(s => s.theme);

  return (
    <div className='SessionHeader' style={{background}}>
      <div className='SessionHeader-items'>
        {/* Left side */}
        <Logo />
        <p className='SessionHeader-title'>{routineTitle}</p>
        <div className='SessionHeader-timer'>
          { paused 
          ? <FormatTime seconds={time} showHour />
          : <Timer time={time} setTime={setTime} showHour /> }
        </div>

      </div>
    </div>
  )
}