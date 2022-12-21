import { useState } from 'react';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { RoutineType } from '../../types/RoutineType';
import { days } from '../../utility/data/days_months';
import './Train.css';

// interface TrainProps {

// }

export const Train = () => {

  const date = new Date();

  const [scheduled] = useState<RoutineType[]>([]);
  const [completed] = useState<RoutineType[]>([]);


  return (
    <div className='Train'>

      {scheduled.length ? <div className='Train-scheduled'>
        <p>Your {days[date.getDay()]} Workouts</p>
        <p>{completed.length} / {scheduled.length} complete</p>
      </div> : <div className='Train-noscheduled'>
        <p>You have not scheduled any workouts for today.</p>
      </div>}


      <div className='Train-actions'>
        {!!scheduled.length && <div className='Train-hr-text'>
          <hr></hr>
          <p>or</p>
          <hr></hr>
        </div>}
        <PrimaryButton text='Select a workout' style={{height: '50px'}} icon={'logo'} />
        <PrimaryButton text='Start a custom session' altColor style={{height: '50px'}} icon={'logo'} />
      </div>
    </div>
  )
}