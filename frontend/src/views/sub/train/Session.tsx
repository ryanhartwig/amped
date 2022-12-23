import './Session.css';

import { SessionHeader } from '../../../components/navigation/SessionHeader'
import { SessionFooter } from '../../../components/navigation/SessionFooter';
import { useAppSelector } from '../../../utility/helpers/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// interface SessionProps {

// }

export const Session = () => {
  const navigate = useNavigate();
  const routine = useAppSelector(s => s.session.selectedRoutine);

  const position = useAppSelector(s => s.session.currentPosition);
  const exercise = useAppSelector(s => s.session.selectedRoutine?.exercises[position]);

  useEffect(() => {
    if (!routine) {
      navigate('/home/train')
    }
  }, [navigate, routine]);
  
  return (
    <>
      {routine && <div className='Session'>
        <SessionHeader routineTitle={routine.name}/>
        <div className='Session-content'>

        </div>
        <SessionFooter currentPosition={position} />
      </div>}
    </>
  )
}