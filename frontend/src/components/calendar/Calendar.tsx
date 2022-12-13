import './Calendar.css';

import { Days } from './Days';

/* React Icons */
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { ReactIconButton } from '../ui/ReactIconButton';
import { useCallback, useState } from 'react';

// interface CalendarProps {

// }

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface View {
  month: number,
  year: number,
}

export const Calendar = () => {

  const today = new Date();
  const initDate = new Date();
  initDate.setDate(1);
  initDate.setDate(initDate.getDay() * -1);

  // Month currently selected / viewing
  const [viewing, setViewing] = useState<View>({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  // First date to show on the top left most cell of the calendar
  const [startDate, setStartDate] = useState<Date>(initDate);

  // Increment / decrement month
  const onMonthSwitch = useCallback((n: number) => {
    const newDate = new Date(startDate);

    newDate.setMonth(newDate.getMonth() + n);
    
    setViewing({
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
    })

    newDate.setDate(1);
    newDate.setDate(newDate.getDay() * -1);

    setStartDate(newDate);
  }, [startDate]);

  const blockInc = viewing.month === today.getMonth() && viewing.year === today.getFullYear();

  return (
    <div className='Calendar'>
      {/* Year/Month Select */}
      <div className='Calendar-period noselect'>
        <div className='Calendar-period-month'>
          <ReactIconButton onClick={() => onMonthSwitch(0)} style={{borderRadius: '12px'}}>
            <AiOutlineLeft size={15}/>
          </ReactIconButton>
          <h2>{months[viewing.month]}</h2>
          { !blockInc && <ReactIconButton onClick={() => onMonthSwitch(2)} style={{borderRadius: '12px'}}>
            <AiOutlineRight size={15}/>
          </ReactIconButton>}
        </div>
        <h2>{viewing.year}</h2>
      </div>

      {/* Day of the Week */}
      <div className='Calendar-days'>
        {days.map(d => <p key={d}>{d}</p>)}
      </div>
      
      {/* Calendar Days */}
      <div className='Calendar-fields-wrapper'>
        <Days date={startDate} viewing={viewing} />
      </div>
    </div>
  )
}