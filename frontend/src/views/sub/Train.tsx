import { useState } from 'react';
import { Routine } from '../../components/Routine';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { RoutineType } from '../../types/RoutineType';
import { days } from '../../utility/data/days_months';
import { useAppSelector } from '../../utility/hooks';
import './Train.css';

// interface TrainProps {

// }

export const Train = () => {
  const date = new Date();

  const samples = useAppSelector(s => s.workouts.routines)
  const sample = Array(Math.floor(Math.random() * 12)).fill(true).map(r => samples[Math.floor(Math.random() * samples.length)])

  const { background_alt: background } = useAppSelector(s => s.theme);

  const [scheduled] = useState<RoutineType[]>(sample);
  const [completed] = useState<RoutineType[]>([]);


  return (
    <div className='Train'>
      
      {scheduled.length ? <div className='Train-scheduled-info'>
        <p>Your {days[date.getDay()]} Workouts</p>
        <p>{completed.length} / {scheduled.length} complete</p>
      </div> : <p>You have not scheduled any workouts for today.</p>}
      
      {!!scheduled.length && 
      <div className='Train-scheduled'>
        <div className='Train-scheduled-workouts hidescrollbar' style={{background}}>
          {scheduled.map((r, i) => 
            <Routine key={`${r}-${i}`} routine={r} />
          )}
        </div>
      </div> 
      }


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