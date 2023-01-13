import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Routine } from '../../../components/Routine';
import { Search } from '../../../components/search/Search';
import { WorkoutSummary } from '../../../components/stats/WorkoutSummary';
import { Modal } from '../../../components/ui/Modal';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { setPosition, setSelectedRoutine, setRoutineSummaryId } from '../../../store/slices/sessionSlice';
import { selectCompletedToday } from '../../../store/slices/workoutDataSlice';
import { ExerciseType } from '../../../types/ExerciseType';
import { RoutineDataType } from '../../../types/RoutineDataType';
import { RoutineType } from '../../../types/RoutineType';
import { days } from '../../../utility/data/days_months';
import { useAppSelector } from '../../../utility/helpers/hooks';
import './Train.css';

export const Train = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const date = new Date();

  const { background_alt: background } = useAppSelector(s => s.theme);
  const triggerRef = useRef<any>(undefined!);

  const routines = useAppSelector(s => s.workouts.routines);
  const scheduled = useAppSelector(s => s.user.scheduled).filter(s => s.day === days[date.getDay()].toLowerCase());
  const scheduledIds = scheduled.map(s => s.id);
  const allCompletedToday = useAppSelector(selectCompletedToday);
  const scheduledCompleted = allCompletedToday.filter(r => scheduledIds.includes(r.routine_id || ''));


  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<RoutineType | ExerciseType>();
  const [highlighted, setHighlighted] = useState<RoutineType | ExerciseType>();

  const routineDataId = useAppSelector(s => s.session.routineSummaryId);
  const routineData = useAppSelector(s => s.workoutData.routineData);
  const summaryData = useMemo<RoutineDataType | undefined>(() => routineData.find(r => r.id === routineDataId), [routineData, routineDataId]);

  useEffect(() => {
    setHighlighted(undefined);
  }, [open]);

  useEffect(() => {
    if (!selected || selected.type !== 'Routine') return;
    dispatch(setSelectedRoutine(selected.id));
    dispatch(setPosition(0));
    navigate('/home/train/overview')
  }, [dispatch, navigate, selected])

  const onContinue = useCallback(() => {
    setOpen(false);
    setSelected(highlighted)
  }, [highlighted]);

  return (
    <div className='Train'>
      
      {scheduled.length ? <div className='Train-scheduled-info'>
        <p>Your {days[date.getDay()]} Routines</p>
        <p>{new Set(scheduledCompleted.map(s => s.routine_id)).size} / {scheduled.length} complete</p>
      </div> : <p>You have not scheduled any workouts for today.</p>}
      
      {!!scheduled.length && 
      <div className='Train-scheduled'>
        <div className='Train-scheduled-workouts hidescrollbar' style={{background}}>
          {scheduled.map((s, i) => 
            <Routine selected={selected} setSelected={setSelected} key={s.id} completed={scheduledCompleted.some(c => c.routine_id === s.routine_id)} routine={routines.find(r => r.id === s.routine_id)!} />
          )}
        </div>
      </div> 
      }


      <div className='Train-actions'>
        {!!scheduled.length && <div className='Train-hr-text'>
          <hr></hr>
          <p>or</p>
          <hr></hr>
        </div>}
        <div >
          <PrimaryButton ref={triggerRef} onClick={() => setOpen(true)}  text='Select routine' style={{height: '50px', marginBottom: 60}} icon={'logo'} />
        </div>
        {/* <PrimaryButton text='Start a custom session' altColor style={{height: '50px'}} icon={'logo'} /> */}
      </div>

      <Modal closeText='Close' onClose={() => setOpen(false)} open={open}>
        <Modal.Header>Select a routine to start</Modal.Header>
        <div className='Train-routines-search'>
          <Search selected={highlighted} setSelected={setHighlighted} tab='Routines' />
        </div>
        <PrimaryButton onClick={onContinue} style={{marginTop: 8}} text={highlighted ? 'Continue' : 'Select a routine'} disabled={!highlighted} />
      </Modal>

      <Modal onClose={() => dispatch(setRoutineSummaryId(undefined))} open={!!summaryData} closeText='Close' >
        <Modal.Header>Summary</Modal.Header>
        {summaryData && <WorkoutSummary routineData={summaryData} onClose={() => dispatch(setRoutineSummaryId(undefined))} />}
      </Modal>
    </div>
  )
}