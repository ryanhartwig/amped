import './Exercise.css';

import type { ExerciseType } from '../types/ExerciseType';
import { lazySearch } from '../utility/helpers/lazySearch';
import { useAppSelector } from '../utility/hooks';
import { Tag } from './ui/Tag';

/* React icons */
import { AiFillStar, AiOutlinePlus } from 'react-icons/ai';
import clsx from 'clsx';


interface ExerciseProps {
  exercise: ExerciseType,
  query?: string,
  activeTags?: Set<string>,
  onSelect?: (...args: any) => any,
  selectedPosition?: number,
}

export const Exercise = ({exercise, query, activeTags, onSelect = undefined, selectedPosition}: ExerciseProps) => {

  const { background_routine: background } = useAppSelector(s => s.theme);

  const tagged = activeTags ? (!activeTags.size || activeTags.has(exercise.exercise_goal)) : true;
  const searched = query ? lazySearch(query, exercise.name, exercise.muscle_target) : true;

  return (
    <>
      {tagged && searched && 
      <div className={clsx('Exercise', {'selected': selectedPosition})} onClick={onSelect} style={{background}}>
        {exercise.favourited && <AiFillStar className='Exercise-favourite' />}
        <h2>{exercise.name}</h2>
        <div className='Exercise-goal'>
          <p>{exercise.exercise_goal}</p>
        </div>
        <Tag text={exercise.muscle_target} 
          style={{height: '19px', marginLeft: '5px'}}
          fontSize='10px' 
        />
        {onSelect && 
        <div className='Exercise-position' style={{background}}>
          {selectedPosition ? <div className='Exercise-position-number'>
            <p>{selectedPosition}</p>
          </div> : <AiOutlinePlus size={13} style={{opacity: 0.3}} /> }
        </div> 
        }
      </div>}
    </>
  )
}