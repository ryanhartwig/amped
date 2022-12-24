import './Session.css';

import { SessionHeader } from '../../../components/navigation/SessionHeader'
import { SessionFooter } from '../../../components/navigation/SessionFooter';
import { useAppSelector } from '../../../utility/helpers/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionData } from './SessionData';

// interface SessionProps {

// }

export const Session = () => {
  const navigate = useNavigate();

  const routine = useAppSelector(s => s.session.selectedRoutine);
  const position = useAppSelector(s => s.session.currentPosition);
  const exercise = useAppSelector(s => s.session.selectedRoutine?.exercises[position]);

  const [exerciseTime, setExerciseTime] = useState<number>(0);
  const [routineTime, setRoutineTime] = useState<number>(0);

  useEffect(() => {
    if (!routine) {
      navigate('/home/train')
    }
  }, [navigate, routine]);
  
  return (
    <>
      {routine && exercise && 
      <div className='Session'>
        <SessionHeader time={routineTime} setTime={setRoutineTime} routineTitle={routine.name} />
          <SessionData exercise={exercise.exercise} 
            exerciseTime={exerciseTime}
            position={position}
            routine={routine}
            routineTime={routineTime}
            setExerciseTime={setExerciseTime} 
          />
        <SessionFooter currentPosition={position} />
      </div>}
    </>
  )
}