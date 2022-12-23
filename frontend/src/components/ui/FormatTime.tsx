import { zeroTime } from '../../utility/helpers/zeroTime';
import './FormatTime.css';

interface FormatTimeProps {
  seconds: number,
  showHour?: boolean,
}

export const FormatTime = ({seconds, showHour}: FormatTimeProps) => {


  const hr = zeroTime(Math.floor(seconds / 3600));
  const min = zeroTime(Math.floor((seconds - (Number(hr) * 3600)) / 60));
  const sec = zeroTime(seconds % 60);

  return (
    <div className='FormatTime'>
      <p>{(!!Number(hr) || showHour) && `${hr}:`}{`${min}:`}{`${sec}`}</p>
    </div>
  )
}