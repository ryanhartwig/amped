import { Calendar } from '../../components/calendar/Calendar';
import { WeeklyTarget } from '../../components/stats/WeeklyTarget';
import './Dash.css';


// interface DashProps {

// }

export const Dash = () => {



  return (
    <div className='Dash'>
      <Calendar />
      <WeeklyTarget />
    </div>
  )
}