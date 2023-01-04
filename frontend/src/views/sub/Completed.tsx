import { useCallback, useState } from 'react';
import { Calendar } from '../../components/calendar/Calendar';
import { Routine } from '../../components/Routine';
import { WorkoutSummary } from '../../components/stats/WorkoutSummary';
import { Modal } from '../../components/ui/Modal';
import { selectCompletedToday } from '../../store/slices/workoutDataSlice';
import { RoutineDataType } from '../../types/RoutineDataType';
import { RoutineType } from '../../types/RoutineType';
import { useAppSelector } from '../../utility/helpers/hooks';
import './Completed.css';

export const Completed = () => {

  const today = useAppSelector(selectCompletedToday);
  const allRoutines = useAppSelector(s => s.workouts.routines);
  
  const [performed, setPerfomed] = useState<RoutineDataType[]>(today);
  const [summaryData, setSummaryData] = useState<RoutineDataType | false>(false);

  const routines = Array.from(new Set(performed.map(p => p.routine_id)))
    .map(id => allRoutines.find(r => r.id === id))
    .filter(r => r !== undefined) as RoutineType[]
  ;



    
  const onSelect = useCallback(() => {
    
  }, []);

  return (
    <div className='Completed'>
      <div className='Completed-calendar'>
        <Calendar showPeriod />
      </div>
      <div className='Completed-routines'>
        {performed.map(p => 
          <Routine routine={routines.find(r => r.id === p.routine_id)!} 
            completed 
            start_date={p.start_date}
            onSelect={() => setSummaryData(p)}
          />)}
      </div>

      {/* <Modal onClose={() => setSummaryData(undefined)} open={!!summaryData} closeText='Close'>
        <Modal.Header>Workout Summary</Modal.Header>
        {summaryData && <WorkoutSummary sessionData={summaryData} setOpen={setSummaryData as any} />}
      </Modal> */}
    </div>
  )
}