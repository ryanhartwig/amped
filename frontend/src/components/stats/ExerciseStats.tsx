import { ExerciseDataType } from '../../types/ExerciseDataType';
import { useAppSelector } from '../../utility/helpers/hooks';
import './ExerciseStats.css';

interface ExerciseStatsProps {
  exerciseData: ExerciseDataType,
}

export const ExerciseStats = ({exerciseData: d}: ExerciseStatsProps) => {

  const { background_routine: background } = useAppSelector(s => s.theme);

  return (
    <div className='ExerciseStats' style={{background}}>
      <div className='ExerciseStats-position'>
        {d.exercise_position + 1}
      </div>
    </div>
  )
}