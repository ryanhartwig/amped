import './Routine.css';

import { RoutineType } from '../types/RoutineType';
import { Tag } from './ui/Tag';

/* React Icons */
import { VscFlame } from 'react-icons/vsc';
import { useAppSelector } from '../utility/hooks';
import { AiFillStar } from 'react-icons/ai';

interface RoutineProps {
  routine: RoutineType,
}

export const Routine = ({routine}: RoutineProps) => {

  const intensity = Array(routine.intensity).fill(0);

  const { background_routine: background } = useAppSelector(s => s.theme);

  return (
    <div className='Routine' style={{background}}>
      <div className='Routine-top'>
        <div className='Routine-top-nametag'>
          {routine.favourited && <AiFillStar className='Routine-favourite' />}
          <h2>{routine.name}</h2>
          <div className='Routine-tags'>
            {routine.tags?.map(t => 
              <Tag key={`tag-${routine.id}`} 
                text={t} 
                style={{
                  height: '90%', 
                  fontSize: '13px',
                  margin: '0 0 0 4px',
                }} />)}
          </div>
        </div>

        <div className='Routine-intensity'>
          {intensity.map(() => <VscFlame />)}
        </div>
        
      </div>
      <div className='Routine-bottom'>
        <p>{routine.exercises.length} Exercises <span className='Routine-duration'>∙ {routine.est_duration} min</span></p>
      </div>
    </div>
  )
}