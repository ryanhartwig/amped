import './Calendar.css';
import { Days } from './Days';

// interface CalendarProps {

// }

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septempber', 'October', 'November', 'December'];

export const Calendar = () => {

  const currentDate = new Date();

  const view = {
    month: currentDate.getMonth(),
    year: currentDate.getFullYear()
  }

  currentDate.setDate(1);

  const day = currentDate.getDay();
  currentDate.setDate(day * -1);


  return (
    <div className='Calendar'>
      {/* Year/Month Select */}
      <div className='Calendar-month'>
        <h2>{months[view.month]}</h2>
        <h2>{view.year}</h2>
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