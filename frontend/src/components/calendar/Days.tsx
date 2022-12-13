import { useMemo } from 'react';
import { Day } from './Day';
import './Days.css';

interface DaysProps {
  date: Date,
  viewing: {
    month: number,
    year: number,
  }
}

export const Days = ({date, viewing}: DaysProps) => {

  const days = useMemo(() => {
    const weekDate = new Date(date);

    const array = new Array(42).fill(0);

    return array.map((n, i) => {
      const day = weekDate.getDate();
      if (i && day === 0) {
        weekDate.setMonth(weekDate.getMonth() + 1);
      }

      weekDate.setDate(day + 1);
      
      return new Date(weekDate);
    })
  }, [date]);


  return (
    <div className='Days'>
      {days.map((d, i) => <Day key={`${i}-${d.getDate}`} date={d} viewing={viewing} />)}
    </div>
  )
}