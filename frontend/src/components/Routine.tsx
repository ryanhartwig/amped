import { RoutineType } from '../types/RoutineType';
import './Routine.css';

interface RoutineProps {
  routine: RoutineType,
}

export const Routine = ({routine}: RoutineProps) => {


  return (
    <div className='Routine'>
      <h2>{routine.name}</h2>
    </div>
  )
}