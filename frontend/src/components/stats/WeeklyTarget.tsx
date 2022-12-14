import clsx from 'clsx';
import { IoIosFlash } from 'react-icons/io';
import { days } from '../../utility/data/days_months';
import './WeeklyTarget.css';

// interface WeeklyTargetProps {

// }

export const WeeklyTarget = () => {

  const today = new Date();

  return (
    <div className='WeeklyTarget'>
      {days.map((d, i) => {
        const trained = !!Math.round(Math.random() * 1.2) && i <= today.getDay();
        return <div 
          className={clsx(
            'WeeklyTarget-day',
            {trained},
            {'today': i === today.getDay()}
          )} 
          key={`dash-target-${d}`}
        >
          {trained && 
          <IoIosFlash size={'85%'} className='WeeklyTarget-trained' />}

          <p>{d[0]}</p>
        </div>
      })}
    </div>
  )
}