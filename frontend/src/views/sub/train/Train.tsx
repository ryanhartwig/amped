import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Routine } from '../../../components/Routine';
import { Search } from '../../../components/search/Search';
import { Modal } from '../../../components/ui/Modal';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { setPosition, setSelectedRoutine, setShowSummary } from '../../../store/slices/sessionSlice';
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
  const completed = scheduled.filter(s => s.completed);

  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<RoutineType | ExerciseType>();
  const [highlighted, setHighlighted] = useState<RoutineType | ExerciseType>();

  const showSummary = useAppSelector(s => s.session.showSummary);
  const [summary, setSummary] = useState<boolean>(showSummary);

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

  return (
    <div className='Train'>
      
      {scheduled.length ? <div className='Train-scheduled-info'>
        <p>Your {days[date.getDay()]} routines</p>
        <p>{completed.length} / {scheduled.length} complete</p>
      </div> : <p>You have not scheduled any workouts for today.</p>}
      
      {!!scheduled.length && 
      <div className='Train-scheduled'>
        <div className='Train-scheduled-workouts hidescrollbar' style={{background}}>
          {scheduled.map((r, i) => 
            <Routine selected={selected} setSelected={setSelected} key={`${r}-${i}`} completed={r.completed} routine={r.routine} />
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
        <PrimaryButton onClick={() => setSelected(highlighted)} style={{marginTop: 8}} text={highlighted ? 'Continue' : 'Select a routine'} disabled={!highlighted} />
      </Modal>

      <Modal onClose={() => setSummary(false)} open={summary}>
        <p>summary stuff</p>
      </Modal>
    </div>
  )
}