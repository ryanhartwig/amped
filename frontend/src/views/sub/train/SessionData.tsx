import './SessionData.css';

import { Timer } from '../../../components/stats/Timer';
import { InfoBorder } from '../../../components/ui/InfoBorder';
import { useRef, useMemo } from 'react';
import uuid from 'react-uuid';
import { ExerciseDataType } from '../../../types/ExerciseDataType';
import { useAppSelector } from '../../../utility/helpers/hooks';
import { ExerciseType } from '../../../types/ExerciseType';
import { RoutineType } from '../../../types/RoutineType';
import { useDispatch } from 'react-redux';

interface SessionDataProps {
  routine: RoutineType,
  exercise: ExerciseType,
  routineTime: number,
  exerciseTime: number,
  setExerciseTime: React.Dispatch<React.SetStateAction<number>>,
  position: number,
}

export const SessionData = ({routine, exercise, routineTime, exerciseTime, setExerciseTime, position}: SessionDataProps) => {
  const { background } = useAppSelector(s => s.theme);
  
  const routineId = useRef<string>(uuid());
  const startDate = useRef<Date>(new Date());

  const exerciseData = useMemo<ExerciseDataType>(() => ({
    duration: exerciseTime,
    exercise_id: exercise.id,
    exercise_position: position,
    id: uuid(),
    routine_data_id: routineId.current,
    sets: [],
  }), [exercise.id, exerciseTime, position])


  return (
    <div className='SessionData'>
      <InfoBorder background={background} title={exercise.name} buttonText={'See notes'}>
        <InfoBorder.HeaderLeft>
          <p className='SessionData-info'>{position + 1} <span className='SessionData-of'>of</span> {routine.exercises.length}</p>
        </InfoBorder.HeaderLeft>
        <InfoBorder.HeaderRight>
          <Timer className={'SessionData-info timer'} time={exerciseTime} setTime={setExerciseTime} />
        </InfoBorder.HeaderRight>
      </InfoBorder>
    </div>
  )
}