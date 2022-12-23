import './SessionHeader.css';

import { Logo } from '../ui/Logo';

/* React Icons */
import { useAppSelector } from '../../utility/helpers/hooks';
import { Timer } from '../stats/Timer';

interface SessionheaderProps {
  routineTitle: string,
}

export const SessionHeader = ({routineTitle}: SessionheaderProps) => {

  const { foreground: background } = useAppSelector(s => s.theme);

  return (
    <div className='SessionHeader' style={{background}}>
      <div className='SessionHeader-items'>
        {/* Left side */}
        <Logo />
        <p className='SessionHeader-title'>{routineTitle}</p>
        <div className='SessionHeader-timer'>
          <Timer />
        </div>

      </div>
    </div>
  )
}