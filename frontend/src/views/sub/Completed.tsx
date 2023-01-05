import { useCallback, useState } from 'react';
import { Calendar } from '../../components/calendar/Calendar';
import { Routine } from '../../components/Routine';
import { WorkoutSummary } from '../../components/stats/WorkoutSummary';
import { Modal } from '../../components/ui/Modal';
import { selectCompletedToday } from '../../store/slices/workoutDataSlice';
import { RoutineDataType } from '../../types/RoutineDataType';
import { RoutineType } from '../../types/RoutineType';
import { useAppSelector } from '../../utility/helpers/hooks';
import { minMaxDate } from '../../utility/helpers/minMaxDate';
import './Completed.css';

export const Completed = () => {

  const today = useAppSelector(selectCompletedToday);
  const allRoutines = useAppSelector(s => s.workouts.routines);
  
  const { background_alt: background } = useAppSelector(s => s.theme);

  const [summaryData, setSummaryData] = useState<RoutineDataType>();
  const [selected, setSelected] = useState<[number, number]>(minMaxDate(new Date()));

  const routines = Array.from(new Set(today.map(p => p.routine_id)))
    .map(id => allRoutines.find(r => r.id === id))
    .filter(r => r !== undefined) as RoutineType[]
  ;


  
  const onSelect = useCallback(([min, max]: [number, number]) => {
    setSelected([min, max]);
    console.log(min, max);

    const day0 = new Date(min);
    const day1 = new Date(max);

    console.log(day0);
    console.log(day1);
  }, []);

  return (
    <div className='Completed'>
      <div className='Completed-calendar'>
        <Calendar showPeriod selected={selected} onSelect={onSelect} />
      </div>

      <div className='Completed-date'>
        <p>Today</p>
      </div>

      <div className='Completed-routines-wrapper'>
        <div className='Completed-routines hidescrollbar' style={{background}}>
          {today.map(p => 
            <Routine routine={routines.find(r => r.id === p.routine_id)!} 
              key={p.id}
              completed 
              start_date={p.start_date}
              onSelect={() => setSummaryData(p)}
            />)}
        </div>

        <Modal onClose={() => setSummaryData(undefined)} open={!!summaryData} closeText='Close'>
          <Modal.Header>Workout Summary</Modal.Header>
          {summaryData && <WorkoutSummary routineData={summaryData} onClose={() => setSummaryData(undefined)} />}
        </Modal>
      </div>
    </div>
  )
}