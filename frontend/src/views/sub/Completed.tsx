import { useCallback, useMemo, useState } from 'react';
import { Calendar } from '../../components/calendar/Calendar';
import { Routine } from '../../components/Routine';
import { WorkoutSummary } from '../../components/stats/WorkoutSummary';
import { Modal } from '../../components/ui/Modal';
import { RoutineDataType } from '../../types/RoutineDataType';
import { RoutineType } from '../../types/RoutineType';
import { useAppSelector } from '../../utility/helpers/hooks';
import { minMaxDate } from '../../utility/helpers/minMaxDate';
import './Completed.css';

export const Completed = () => {
  const [todayMin, todayMax] = minMaxDate(new Date());

  const data = useAppSelector(s => s.workoutData.routineData);
  const allRoutines = useAppSelector(s => s.workouts.routines);
  const { background_alt: background } = useAppSelector(s => s.theme);

  const [summaryData, setSummaryData] = useState<RoutineDataType>();
  const [selected, setSelected] = useState<[number, number]>([todayMin, todayMax]);

  const selectedSessions = useMemo<RoutineDataType[]>(() => 
    data.filter(d => selected[0] <= d.start_date && selected[1] >= d.start_date
  ),[data, selected]);

  const routines = Array.from(new Set(selectedSessions.map(p => p.routine_id)))
    .map(id => allRoutines.find(r => r.id === id))
    .filter(r => r !== undefined) as RoutineType[]
  ;
  
  const onSelect = useCallback(([min, max]: [number, number]) => {
    setSelected([min, max]);
  }, []);

  return (
    <div className='Completed'>
      <div className='Completed-calendar'>
        <Calendar showPeriod selected={selected} onSelect={onSelect} />
      </div>

      <div className='Completed-date'>
        <p>{todayMin === selected[0] ? 'Today' : new Date(selected[0]).toDateString()}</p>
      </div>

      <div className='Completed-routines-wrapper'>
        <div className='Completed-routines hidescrollbar' style={{background}}>
          {selectedSessions.map(p => 
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