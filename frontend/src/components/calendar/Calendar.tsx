import './Calendar.css';

import { Days } from './Days';

/* React Icons */
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { ReactIconButton } from '../ui/ReactIconButton';
import { useCallback, useEffect, useState } from 'react';

// interface CalendarProps {

// }

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface View {
  month: number,
  year: number,
}

export const Calendar = () => {

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [viewing, setViewing] = useState<View>({
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  });

  const onMonthSwitch = useCallback((n: number) => {
    const newDate = new Date(currentDate);

    newDate.setMonth(newDate.getMonth() + n);
    
    setViewing({
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
    })

    newDate.setDate(1);
    newDate.setDate(newDate.getDay() * -1);

    setCurrentDate(newDate);
  }, [currentDate]);

  
  

  return (
    <div className='Calendar'>
      {/* Year/Month Select */}
      <div className='Calendar-period noselect'>
        <div className='Calendar-period-month'>
          <ReactIconButton onClick={() => onMonthSwitch(0)} style={{borderRadius: '12px'}}>
            <AiOutlineLeft size={15}/>
          </ReactIconButton>
          <h2>{months[viewing.month]}</h2>
          <ReactIconButton onClick={() => onMonthSwitch(2)} style={{borderRadius: '12px'}}>
            <AiOutlineRight size={15}/>
          </ReactIconButton>
        </div>
        <h2>{viewing.year}</h2>
      </div>

      {/* Day of the Week */}
      <div className='Calendar-days'>
        {days.map(d => <p key={d}>{d}</p>)}
      </div>
      
      {/* Calendar Days */}
      <div className='Calendar-fields-wrapper'>
        <Days date={currentDate} viewing={viewing} />
      </div>
    </div>
  )
}