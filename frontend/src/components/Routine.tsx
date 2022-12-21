import './Routine.css';

import { RoutineType } from '../types/RoutineType';
import { Tag } from './ui/Tag';

/* React Icons */
import { VscFlame } from 'react-icons/vsc';
import { useAppSelector } from '../utility/hooks';
import { getDuration } from '../utility/helpers/getDuration';
import { getDateTime } from '../utility/helpers/getDateTime';
import { useCallback, useEffect } from 'react';
import { lazySearch } from '../utility/helpers/lazySearch';
import { ExerciseType } from '../types/ExerciseType';
import clsx from 'clsx';
import { IoIosFlash } from 'react-icons/io';

interface RoutineProps {
  routine: RoutineType,
  activeTags?: Set<string>,
  query?: string,
  setUserTags?: React.Dispatch<React.SetStateAction<Set<string>>>,
  setEdit?: React.Dispatch<React.SetStateAction<RoutineType | ExerciseType | undefined>>,
  edit?: RoutineType | ExerciseType,
}

export const Routine = ({routine, setUserTags, activeTags, query, edit, setEdit}: RoutineProps) => {
  const intensity = Array(routine.intensity).fill(0);
  const latest = useAppSelector(s => s.workoutData.routineData).find(r => r.routine_id === routine.id);
  
  const { background_routine: background } = useAppSelector(s => s.theme);

  // Filter by tag
  const tagged = activeTags ? (!activeTags.size || Array.from(activeTags).every(t => routine.tags?.includes(t))) : true;
  const searched = query ? lazySearch(query, routine.name) : true;

  const onClick = useCallback(() => {
    setEdit && setEdit(p => p?.id === routine.id ? undefined : routine);
  }, [routine, setEdit]);

  useEffect(() => {
    if (!setUserTags) return;
    setUserTags(p => {
      const set = new Set(p);
      routine.tags?.forEach(t => set.add(t));
      
      return set;
    })
  }, [routine.tags, setUserTags])

  return (
    <>
      {tagged && searched && 
      <div className={clsx('Routine', {'edit': edit && edit.id === routine.id})} style={{background}} onClick={onClick}>
        <div className='Routine-top'>
          <div className='Routine-top-nametag'>
            {routine.favourited && <IoIosFlash className='favourite' />}
            <h2>{routine.name}</h2>
            <div className='Routine-tags'>
              {routine.tags?.map(t => 
                <Tag key={`tag-${routine.id}-${t}`} 
                  text={t} 
                  fontSize='11px'
                  style={{
                    height: '90%', 
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