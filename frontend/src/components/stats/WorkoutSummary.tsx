import { ExerciseDataType } from '../../types/ExerciseDataType';
import './WorkoutSummary.css';

interface SessionData {
  selectedRoutineId: string,
  session_id: string,
  sessionStartDate: number,
  exerciseData: ExerciseDataType[],
}

interface WorkoutSummaryProps {
  sessionData?: SessionData,
}

export const WorkoutSummary = ({sessionData}: WorkoutSummaryProps) => {



  return (
    <div className='WorkoutSummary'>
      <p>test</p>
    </div>
  )
}