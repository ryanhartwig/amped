import clsx from 'clsx';
import './Day.css';

interface DayProps {
  date: Date,
  viewing: {
    month: number,
    year: number,
  }
}

export const Day = ({date, viewing}: DayProps) => {

  return (
    <div className='Day'>
      <div className={clsx('Day-content', {'out-of-view': viewing.month !== date.getMonth()})}>
        <p>{date.getDate()}</p>
      </div>
    </div>
  )
}