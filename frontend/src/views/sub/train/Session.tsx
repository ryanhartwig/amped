import './Session.css';

import { SessionHeader } from '../../../components/navigation/SessionHeader'
import { SessionFooter } from '../../../components/navigation/SessionFooter';
import { useAppSelector } from '../../../utility/helpers/hooks';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { ExerciseDataType } from '../../../types/ExerciseDataType';
import { Timer } from '../../../components/stats/Timer';
import { InfoBorder } from '../../../components/ui/InfoBorder';

// interface SessionProps {

// }

export const Session = () => {
  const navigate = useNavigate();
  
  const routineId = useAppSelector(s => s.session.selectedRoutineId);
  const routine = useAppSelector(s => s.workouts.routines).find(r => r.id === routineId)!;
  const position = useAppSelector(s => s.session.currentPosition)!;
  const exercise = useAppSelector(s => routine.exercises[position])!;
  const { background } = useAppSelector(s => s.theme);

  const prevExerciseData = useAppSelector(s => s.session.exerciseData?.find(e => e.exercise_position === position));

  const [exerciseTime, setExerciseTime] = useState<number>(prevExerciseData?.duration || 0);
  const [routineTime, setRoutineTime] = useState<number>(0);

  const exerciseData = useMemo<ExerciseDataType>(() => ({
    duration: exerciseTime,
    exercise_id: exercise.exercise.id,
    exercise_position: position,
    id: uuid(),
    routine_data_id: routine.id,
    sets: [],
  }), [exercise.exercise.id, exerciseTime, position, routine.id])


  useEffect(() => {
    if (!routineId) {
      navigate('/home/train')
    }
  }, [navigate, routineId]);
  
  return (
    <>
      {routine && exercise && 
      <div className='Session'>
        <SessionHeader time={routineTime} setTime={setRoutineTime} routineTitle={routine.name} />
        <div className='Session-content'>
          <InfoBorder background={background} title={exercise.exercise.name} buttonText={'See notes'}>
            <InfoBorder.HeaderLeft>
              <p className='Session-info'>{position + 1} <span className='Session-of'>of</span> {routine.exercises.length}</p>
            </InfoBorder.HeaderLeft>
            <InfoBorder.HeaderRight>
              <Timer className={'Session-info timer'} time={exerciseTime} setTime={setExerciseTime} />
            </InfoBorder.HeaderRight>
          </InfoBorder>
        </div>
        <SessionFooter exerciseData={exerciseData} routine={routine} currentPosition={position} />
      </div>}
    </>
  )
}