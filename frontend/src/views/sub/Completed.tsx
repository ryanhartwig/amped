import { Calendar } from '../../components/calendar/Calendar';
import './Completed.css';

export const Completed = () => {



  return (
    <div className='Completed'>
      <div className='Completed-calendar'>
        <Calendar showPeriod />
      </div>
    </div>
  )
}