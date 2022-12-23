import './Session.css';

import { SessionHeader } from '../../../components/navigation/SessionHeader'
import { SessionFooter } from '../../../components/navigation/SessionFooter';
import { useAppSelector } from '../../../utility/helpers/hooks';
import { RoutineType } from '../../../types/RoutineType';

// interface SessionProps {

// }

export const Session = () => {

  const routine = useAppSelector(s => s.session.selectedRoutine as RoutineType);

  return (
    <div className='Session'>
      <SessionHeader routineTitle={routine.name}/>
      <div className='Session-content'>

      </div>
      <SessionFooter />
    </div>
  )
}