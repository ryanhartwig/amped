import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Routine } from '../../../components/Routine';
import { Search } from '../../../components/search/Search';
import { WorkoutSummary } from '../../../components/stats/WorkoutSummary';
import { Modal } from '../../../components/ui/Modal';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { setSelectedRoutine, setRoutineSummaryId, initializeSession, setRoutineExercises } from '../../../store/slices/sessionSlice';
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

  const [selectRoutine, setSelectRoutine] = useState<boolean>(false);
  const [selectExercise, setSelectExercise] = useState<boolean>(false);

  // Picked routine or exercise
  const [highlighted, setHighlighted] = useState<RoutineType | ExerciseType>();

  // Selected exercise or routine (will trigger navigation when given a value)
  const [selected, setSelected] = useState<RoutineType | ExerciseType>();

  const routineDataId = useAppSelector(s => s.session.routineSummaryId);
  const routineData = useAppSelector(s => s.workoutData.routineData);
  const summaryData = useMemo<RoutineDataType | undefined>(() => routineData.find(r => r.id === routineDataId), [routineData, routineDataId]);

  useEffect(() => {
    setHighlighted(undefined);
  }, [selectRoutine, selectExercise]);

  useEffect(() => {
    if (!selected) return;

    if (selected.type === 'Exercise') {
      dispatch(setSelectedRoutine(null));
      dispatch(initializeSession());
      dispatch(setRoutineExercises([{
        exercise: selected,
        exercise_id: '',
        id: '',
        position: 0,
        routine_id: '',
        user_id: '',
      }]));
      navigate('/session');
    } else {
      dispatch(setSelectedRoutine(selected.id));
      navigate('/home/train/overview')
    }
  }, [dispatch, navigate, selected])

  const onContinue = useCallback(() => {
    setSelectRoutine(false);
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
        
        <div>
          <PrimaryButton ref={triggerRef} onClick={() => setSelectRoutine(true)}  text='Select routine' style={{height: '50px', }} icon={'logo'} />
          <PrimaryButton onClick={() => setSelectExercise(true)} text='Start a custom session' altColor style={{height: '50px', marginBottom: 40, marginTop: 20}} icon={'logo'} />
        </div>
      </div>

      {/* Select routine to start (normal session) */}
      <Modal closeText='Close' onClose={() => setSelectRoutine(false)} open={selectRoutine}>
        <Modal.Header>Select a routine to start</Modal.Header>
        <div className='Train-routines-search'>
          <Search selected={highlighted} setSelected={setHighlighted} tab='Routines' />
        </div>
        <PrimaryButton onClick={onContinue} style={{marginTop: 8}} text={highlighted ? 'Continue' : 'Select a routine'} disabled={!highlighted} />
      </Modal>

      {/* Select exercise to start (custom session) */}
      <Modal closeText='Cancel' 
        onClose={() => setSelectExercise(false)} 
        open={selectExercise}
      >
        <Modal.Header>Select an exercise to begin</Modal.Header>
        <div className='Train-routines-search'>
          <Search selected={highlighted} setSelected={setHighlighted} tab='Exercises' />
        </div>
        <PrimaryButton onClick={onContinue} style={{marginTop: 8}} text={highlighted ? 'Continue' : 'Select an exercise'} disabled={!highlighted} />
      </Modal>

      {/* Workout summary when finishing */}
      <Modal onClose={() => dispatch(setRoutineSummaryId(undefined))} open={!!summaryData} closeText='Close' >
        <Modal.Header>Summary</Modal.Header>
        {summaryData && <WorkoutSummary routineData={summaryData} onClose={() => dispatch(setRoutineSummaryId(undefined))} />}
      </Modal>
    </div>
  )
}