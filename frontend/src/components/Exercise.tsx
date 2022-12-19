import type { ExerciseType } from '../types/ExerciseType';
import { lazySearch } from '../utility/helpers/lazySearch';
import { useAppSelector } from '../utility/hooks';
import './Exercise.css';
import { Tag } from './ui/Tag';

/* React Icons */
import { AiFillStar } from 'react-icons/ai';

interface ExerciseProps {
  exercise: ExerciseType,
  query?: string,
  activeTags?: Set<string>,
}

export const Exercise = ({exercise, query, activeTags}: ExerciseProps) => {

  const { background_routine: background } = useAppSelector(s => s.theme);

  const tagged = activeTags ? (!activeTags.size || activeTags.has(exercise.exercise_goal)) : true;
  const searched = query ? lazySearch(query, exercise.name, exercise.muscle_target) : true;

  return (
    <>
      {tagged && searched && 
      <div className='Exercise' style={{background}}>
        {exercise.favourited && <AiFillStar className='favourite' />}
        <h2>{exercise.name}</h2>
        <div className='Exercise-goal'>
          <p>{exercise.exercise_goal}</p>
        </div>
        <Tag text={exercise.muscle_target} 
          style={{height: '19px', marginLeft: '5px'}}
          fontSize='10px' />
      </div>}
    </>
  )
}