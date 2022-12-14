import { useState } from 'react';
import { Calendar } from '../../components/calendar/Calendar';
import { WeeklyTarget } from '../../components/stats/WeeklyTarget';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import './Dash.css';


// interface DashProps {

// }

export const Dash = () => {

  const [daysLeft] = useState<number>(2);
  const [workouts] = useState<number>(3);

  return (
    <div className='Dash'>
      <Calendar />

      <div className='Dash-weekly'>
        <p>This Week</p>
        <div className='Dash-weekly-target'>
          <WeeklyTarget />

        </div>
        <p>{daysLeft} day{daysLeft !== 1 && 's'} left to reach training goal</p>
      </div>

      <div className='Dash-train'>
        <p>You have {workouts} workout{workouts !== 1 && 's'} scheduled for today</p>
        <PrimaryButton logo text={'Train'}/>
      </div>
    </div>
  )
}