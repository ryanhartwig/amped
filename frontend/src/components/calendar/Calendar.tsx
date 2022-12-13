import './Calendar.css';
import { Week } from './Week';

// interface CalendarProps {

// }

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Calendar = () => {



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
        <Week />
        <Week />
        <Week />
        <Week />
        <Week />
        <Week />
      </div>
    </div>
  )
}