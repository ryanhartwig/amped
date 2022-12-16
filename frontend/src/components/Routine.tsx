import './Routine.css';

import { RoutineType } from '../types/RoutineType';
import { Tag } from './ui/Tag';
import { sampleLastPerformedRoutines } from '../utility/data/samplePerformedRoutines';

/* React Icons */
import { VscFlame } from 'react-icons/vsc';
import { useAppSelector } from '../utility/hooks';
import { AiFillStar } from 'react-icons/ai';
import { getDuration } from '../utility/helpers/getDuration';
import { getDateTime } from '../utility/helpers/getDateTime';
import { useEffect } from 'react';

interface RoutineProps {
  routine: RoutineType,
  setUserTags: React.Dispatch<React.SetStateAction<Set<string>>>,
  activeTags: Set<string>,
  query: string,
}

export const Routine = ({routine, setUserTags, activeTags, query}: RoutineProps) => {
  const intensity = Array(routine.intensity).fill(0);
  const latest = sampleLastPerformedRoutines.find(r => r.routine_id === routine.id);
  const { background_routine: background } = useAppSelector(s => s.theme);

  // Filter by tag
  const visible = (!activeTags.size || Array.from(activeTags).every(t => routine.tags?.includes(t)))
    && (query.length ? routine.name.toLowerCase().includes(query.toLowerCase()) : true);


  useEffect(() => {
    setUserTags(p => {
      const set = new Set(p);
      routine.tags?.forEach(t => set.add(t));
      
      return set;
    })
  }, [routine.tags, setUserTags])

  return (
    <>
      {visible && 
      <div className='Routine' style={{background}}>
        <div className='Routine-top'>
          <div className='Routine-top-nametag'>
            {routine.favourited && <AiFillStar className='Routine-favourite' />}
            <h2>{routine.name}</h2>
            <div className='Routine-tags'>
              {routine.tags?.map(t => 
                <Tag key={`tag-${routine.id}-${t}`} 
                  text={t} 
                  style={{
                    height: '90%', 
                    fontSize: '13px',
                    margin: '0 0 0 4px',
                  }} />)}
            </div>
          </div>

          <div className='Routine-intensity'>
            {intensity.map((x, i) => <VscFlame key={i} />)}
          </div>
          
        </div>
        <div className='Routine-bottom'>
          <div className='Routine-details'>
            <p>{routine.exercises.length} Exercises∙</p>
            <p className='Routine-duration'>{routine.est_duration} min</p>
          </div>

          {latest && 
          <div className='Routine-latest-data'>
            <p>{getDateTime(latest.start_date)} •</p>
            <p style={{marginLeft: '5px'}}>{getDuration(latest.duration)}</p>
          </div>}
        </div>
      </div> }
    </>
  )
}