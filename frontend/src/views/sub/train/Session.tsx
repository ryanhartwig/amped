import './Session.css';

import { SessionHeader } from '../../../components/navigation/SessionHeader'
import { SessionFooter } from '../../../components/navigation/SessionFooter';
import { useAppSelector } from '../../../utility/helpers/hooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import uuid from 'react-uuid';
import { ExerciseDataType } from '../../../types/ExerciseDataType';
import { Timer } from '../../../components/stats/Timer';
import { InfoBorder } from '../../../components/ui/InfoBorder';
import { useDispatch } from 'react-redux';
import { SetFieldType } from '../../../types/SetFieldType';
import { RoutineExercise } from '../../../types/RoutineType';
import { AddSet } from './AddSet';
import { SetField } from '../../../components/stats/SetField';
import { RoutineDataType } from '../../../types/RoutineDataType';
import { Overview } from './Overview';
import { addEditExerciseData, setPosition } from '../../../store/slices/sessionSlice';

export const Session = () => {
  const dispatch = useDispatch();

  const setsRef = useRef<HTMLDivElement>(undefined!);
  
  const { background } = useAppSelector(s => s.theme);
  const position = useAppSelector(s => s.session.currentPosition);
  const prevExerciseData = useAppSelector(s => s.session.exerciseData.find(e => e.exercise_position === position));

  const routineId = useAppSelector(s => s.session.selectedRoutineId);
  const routine = useAppSelector(s => s.workouts.routines).find(r => r.id === routineId);
  const routineExercises = useAppSelector(s => s.session.exercises);

  const exercise = useMemo<RoutineExercise>(() => routineExercises[position], [position, routineExercises]);

  const session = useAppSelector(s => s.session);
  const user_id = useAppSelector(s => s.user.id);

  const [id, setId] = useState<string>(uuid());
  const [sets, setSets] = useState<SetFieldType[]>([]);
  const [exerciseTime, setExerciseTime] = useState<number>(0);
  const [routineTime, setRoutineTime] = useState<number>(0);
  const [setTime, setSetTime] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);

  const currentExerciseData = useMemo<ExerciseDataType>(() => ({
    duration: exerciseTime,
    exercise_id: exercise.exercise.id,
    exercise_position: position,
    exercise_name: exercise.exercise.name,
    id,
    performed_routine_id: session.session_id,
    sets, 
  }), [exercise.exercise.id, exercise.exercise.name, exerciseTime, id, position, session.session_id, sets]);

  const routineData: RoutineDataType = useMemo(() => ({
    duration: routineTime,
    user_id,
    id: session.session_id,
    routine_id: session.routine_id,
    start_date: session.sessionStartDate,
    exerciseData: session.exerciseData,
    notes: null,
    energy: null,
  }), [routineTime, session.exerciseData, session.routine_id, session.sessionStartDate, session.session_id, user_id]);

  const onNavigate = useCallback((dir: 1 | -1) => {
    dispatch(addEditExerciseData(currentExerciseData));
    if (position + dir === routineExercises.length) return; 

    dispatch(setPosition(position + dir));
    setExerciseTime(0);
    setId(uuid());
    setSets([]);
    setSetTime(0);
  }, [currentExerciseData, dispatch, position, routineExercises]);

  const onAddSet = useCallback((set: SetFieldType) => {
    setSets(p => [...p, set].map((s, i) => ({...s, id: uuid(), position: i})) as SetFieldType[]);
  }, [])

  useEffect(() => {
    setsRef.current.scrollTop = setsRef?.current?.scrollHeight;
  }, [sets]);
  
  // Update exerciseData state fields with previous data (if exists)
  useEffect(() => {
    if (!prevExerciseData) return;

    setExerciseTime(prevExerciseData.duration);
    setId(prevExerciseData.id);
    setSets(prevExerciseData.sets);
  }, [prevExerciseData]);
  
  return (
    <div className='Session' style={{background}}> 
      <SessionHeader paused={paused} time={routineTime} setTime={setRoutineTime} routineTitle={routine?.name || 'Anonymous'} />
      
      {paused 
    ? <div className='Session-paused'>
        <Overview inSession />
      </div> 
    : <div className='Session-content'>
        <InfoBorder background={background} 
          title={exercise.exercise.name} 
          buttonText={exercise.exercise.notes ? 'See notes' : undefined}
          modalHeader='Exercise notes'
          modalContent={<p style={{whiteSpace: 'pre-wrap'}}>{exercise.exercise.notes}</p>}
        >
          <InfoBorder.HeaderLeft>
            <p className='Session-info'>{position + 1} <span className='Session-of'>of</span> {routineExercises.length}</p>
          </InfoBorder.HeaderLeft>
          <InfoBorder.HeaderRight>
            <Timer className={'Session-info timer'} time={exerciseTime} setTime={setExerciseTime} />
          </InfoBorder.HeaderRight>

          {/* Setlist & Add Set Area */}
          <div className='Session-content-inner'>
            <div className='Session-content-sets hidescrollbar' ref={setsRef}>
              {sets.map(s => <SetField setSets={setSets} key={s.id} set={s} sets={sets} />)}
            </div>
            <AddSet onAddSet={onAddSet} setTime={setTime} setSetTime={setSetTime} exercise_data_id={currentExerciseData.id} />
          </div>
        </InfoBorder>
      </div>}
      
      <SessionFooter 
        setPaused={setPaused} 
        paused={paused} 
        routineData={routineData} 
        onNavigate={onNavigate} 
        currentPosition={position} 
        anonymous={!routine}
      />
    </div>
  )
}