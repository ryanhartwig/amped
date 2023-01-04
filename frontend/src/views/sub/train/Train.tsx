import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Routine } from '../../../components/Routine';
import { Search } from '../../../components/search/Search';
import { WorkoutSummary } from '../../../components/stats/WorkoutSummary';
import { Modal } from '../../../components/ui/Modal';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { selectSessionData, setPosition, setSelectedRoutine, setShowSummary } from '../../../store/slices/sessionSlice';
import { completedRoutinesToday } from '../../../store/slices/workoutDataSlice';
import { ExerciseType } from '../../../types/ExerciseType';
import { RoutineType } from '../../../types/RoutineType';
import { ScheduledState } from '../../../types/scheduledState';
import { days } from '../../../utility/data/days_months';
import { useAppSelector } from '../../../utility/helpers/hooks';
import './Train.css';

export const Train = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const date = new Date();

  const { background_alt: background } = useAppSelector(s => s.theme);
  const triggerRef = useRef<any>(undefined!);

  const scheduled = useAppSelector(s => s.user.scheduled[days[date.getDay()].toLowerCase() as keyof ScheduledState])
  const scheduledIds = scheduled.map(s => s.id);
  const allCompletedToday = useAppSelector(completedRoutinesToday);
  const scheduledCompleted = allCompletedToday.filter(r => scheduledIds.includes(r.routine_id));

  useEffect(() => {
    console.log('all: ', allCompletedToday);
    console.log('scheduled: ', scheduledCompleted);
  }, [allCompletedToday, scheduledCompleted]);

  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<RoutineType | ExerciseType>();
  const [highlighted, setHighlighted] = useState<RoutineType | ExerciseType>();

  const showSummary = useAppSelector(s => s.session.showSummary);
  const [summary, setSummary] = useState<boolean>(showSummary);
  const sessionData = useAppSelector(selectSessionData);

  useEffect(() => {
    if (showSummary) setTimeout(() => { dispatch(setShowSummary(false)) }, 10);
  }, [dispatch, showSummary]);

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
        <p>{scheduledCompleted.length} / {scheduled.length} complete</p>
      </div> : <p>You have not scheduled any workouts for today.</p>}
      
      {!!scheduled.length && 
      <div className='Train-scheduled'>
        <div className='Train-scheduled-workouts hidescrollbar' style={{background}}>
          {scheduled.map((r, i) => 
            <Routine selected={selected} setSelected={setSelected} key={`${r}-${i}`} completed={scheduledCompleted.some(s => s.routine_id === r.id)} routine={r} />
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
          <PrimaryButton ref={triggerRef} onClick={() => setOpen(true)}  text='Select a routine' style={{height: '50px'}} icon={'logo'} />
        </div>
        <PrimaryButton text='Start a custom session' altColor style={{height: '50px'}} icon={'logo'} />
      </div>

      <Modal closeText='Close' onClose={() => setOpen(false)} open={open}>
        <Modal.Header>Select a routine to start</Modal.Header>
        <div className='Train-routines-search'>
          <Search selected={highlighted} setSelected={setHighlighted} tab='Routines' />
        </div>
        <PrimaryButton onClick={onContinue} style={{marginTop: 8}} text={highlighted ? 'Continue' : 'Select a routine'} disabled={!highlighted} />
      </Modal>

      <Modal onClose={() => setSummary(false)} open={summary} closeText='Close' >
        <Modal.Header>Summary</Modal.Header>
        <WorkoutSummary sessionData={sessionData} setOpen={setSummary} />
      </Modal>
    </div>
  )
}