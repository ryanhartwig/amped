import type { ExerciseType } from '../types/ExerciseType';
import { useAppSelector } from '../utility/hooks';
import { useLazySearch } from '../utility/hooks/useLazySearch';
import './Exercise.css';
import { Tag } from './ui/Tag';

interface ExerciseProps {
  exercise: ExerciseType,
  query: string,
  activeTags: Set<string>,
}

export const Exercise = ({exercise, query, activeTags}: ExerciseProps) => {

  const { background_routine: background } = useAppSelector(s => s.theme);

  const tagged = (!activeTags.size || activeTags.has(exercise.exercise_goal));
  const searched = useLazySearch(query, exercise.name, exercise.muscle_target);

  return (
    <>
      {tagged && searched && 
      <div className='Exercise' style={{background}}>
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