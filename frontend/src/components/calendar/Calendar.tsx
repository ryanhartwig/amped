import { useMemo } from 'react';
import './Calendar.css';
import { Days } from './Days';

// interface CalendarProps {

// }

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Calendar = () => {

  const currentDate = new Date();
  console.log(currentDate.getMonth())

  currentDate.setDate(1);
  console.log(currentDate.getMonth());
  console.log(currentDate.getDay());

  const day = currentDate.getDay();
  currentDate.setDate(day * -1);


  return (
    <div className='Calendar'>
      {/* Year/Month Select */}
      <div className='Calendar-month'>
        <h2>December</h2>
        <h2>2022</h2>
      </div>

      {/* Day of the Week */}
      <div className='Calendar-days'>
        {days.map(d => <p key={d}>{d}</p>)}
      </div>
      
      {/* Calendar Days */}
      <div className='Calendar-fields-wrapper'>
        <Days date={currentDate}/>
      </div>
    </div>
  )
}