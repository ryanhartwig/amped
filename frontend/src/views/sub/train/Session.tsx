import './Session.css';

import { SessionHeader } from '../../../components/navigation/SessionHeader'
import { SessionFooter } from '../../../components/navigation/SessionFooter';
import { useAppSelector } from '../../../utility/helpers/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoBorder } from '../../../components/ui/InfoBorder';
import { Timer } from '../../../components/stats/Timer';

// interface SessionProps {

// }

export const Session = () => {
  const navigate = useNavigate();

  const routine = useAppSelector(s => s.session.selectedRoutine);
  const position = useAppSelector(s => s.session.currentPosition);
  const exercise = useAppSelector(s => s.session.selectedRoutine?.exercises[position]);
  const { background } = useAppSelector(s => s.theme);

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
        <SessionFooter currentPosition={position} />
      </div>}
    </>
  )
}