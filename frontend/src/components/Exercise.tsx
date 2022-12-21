import './Exercise.css';

import type { ExerciseType } from '../types/ExerciseType';
import { lazySearch } from '../utility/helpers/lazySearch';
import { useAppSelector } from '../utility/hooks';
import { Tag } from './ui/Tag';

/* React icons */
import { AiOutlinePlus } from 'react-icons/ai';
import clsx from 'clsx';
import { useCallback } from 'react';
import { RoutineType } from '../types/RoutineType';
import { IoIosFlash } from 'react-icons/io';


interface ExerciseProps {
  exercise: ExerciseType,
  query?: string,
  activeTags?: Set<string>,
  onSelect?: (...args: any) => any,
  selectedPosition?: number,
  setEdit?: React.Dispatch<React.SetStateAction<RoutineType | ExerciseType | undefined>>,
  edit?: RoutineType | ExerciseType,
}

export const Exercise = ({exercise, query, activeTags, onSelect = undefined, edit, setEdit, selectedPosition}: ExerciseProps) => {

  const { background_routine: background } = useAppSelector(s => s.theme);

  const tagged = !activeTags?.size || (!activeTags.size || activeTags.has(exercise.exercise_goal));
  const searched = !query?.length || lazySearch(query, exercise.name, ...exercise.muscle_targets);

  const onClick = useCallback(() => {
    onSelect && onSelect();
    setEdit && setEdit(exercise);
  }, [exercise, onSelect, setEdit]);

  return (
    <>
      {tagged && searched && 
      <div className={clsx('Exercise', {'edit': edit?.id === exercise.id}, {'selected': selectedPosition})} onClick={onClick} style={{background}}>
        <div className='Exercise-details'>
          {exercise.favourited && <IoIosFlash className='Exercise-favourite' />}
          <h2>{exercise.name}</h2>
          {exercise.exercise_goal && <div className='Exercise-goal'>
            <p>{exercise.exercise_goal}</p>
          </div>}
          
          {onSelect && 
          <div className='Exercise-position' style={{background}}>
            {selectedPosition ? <div className='Exercise-position-number'>
              <p>{selectedPosition}</p>
            </div> : <AiOutlinePlus size={13} style={{opacity: 0.3}} /> }
          </div> 
          }
          
        </div>
        <div className='Exercise-targets hidescrollbar'>
          {exercise.muscle_targets.map(t => 
            <Tag key={`${exercise.id}-${t}`} text={t} style={{height: '19px', marginLeft: '5px'}} fontSize='10px' />
          )}
        </div>


        
      </div>}
    </>
  )
}