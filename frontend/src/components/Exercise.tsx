import type { ExerciseType } from '../types/ExerciseType';
import './Exercise.css';

interface ExerciseProps {
  exercise: ExerciseType,
}

export const Exercise = ({exercise}: ExerciseProps) => {


  return (
    <div className='Exercise'>
      <h2>{exercise.name}</h2>
    </div>
  )
}