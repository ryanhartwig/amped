import './Day.css';

import clsx from 'clsx';

import { IoIosFlash } from 'react-icons/io';

interface DayProps {
  date: Date,
  viewing: {
    month: number,
    year: number,
  }
}

export const Day = ({date, viewing}: DayProps) => {

  const today = new Date();
  const ss = [0, 6].includes(date.getDay());

  const session = (date.getFullYear() < today.getFullYear() 
    || (date.getMonth() < today.getMonth() && date.getFullYear() === viewing.year)
    || (date.getDate() <= today.getDate() && date.getMonth() === viewing.month))
  && Math.round(Math.random());

  return (
    <div className={clsx('Day', {ss})}>
      <div className={clsx(
        'Day-content', 
        {'out-of-view': viewing.month !== date.getMonth()},
        {'today': viewing.month === today.getMonth() && date.getDate() === today.getDate()},
        {ss},
        {session}
      )}>
        {session ? <IoIosFlash size={'80%'} className='Day-content-flash' /> : <></>}
        <p>{date.getDate()}</p>

      </div>
    </div>
  )
}