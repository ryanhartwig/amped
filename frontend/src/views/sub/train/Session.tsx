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
import { setExerciseData, setPosition } from '../../../store/slices/sessionSlice';
import { SetFieldType } from '../../../types/SetFieldType';
import { RoutineExercise } from '../../../types/RoutineType';
import { AddSet } from './AddSet';
import { SetField } from '../../../components/stats/SetField';
import { Modal } from '../../../components/ui/Modal';

export const Session = () => {
  const dispatch = useDispatch();

  const setsRef = useRef<HTMLDivElement>(undefined!);
  
  const routineId = useAppSelector(s => s.session.selectedRoutineId);

  const routine = useAppSelector(s => s.workouts.routines).find(r => r.id === routineId)!;
  const position = useAppSelector(s => s.session.currentPosition)!;
  const exercise = useMemo<RoutineExercise>(() => routine.exercises[position], [position, routine.exercises]);
  
  const { background } = useAppSelector(s => s.theme);

  const prevExerciseData = useAppSelector(s => s.session.exerciseData?.find(e => e.exercise_position === position));

  const [id, setId] = useState<string>(uuid());
  const [sets, setSets] = useState<SetFieldType[]>([]);
  const [exerciseTime, setExerciseTime] = useState<number>(0);
  const [routineTime, setRoutineTime] = useState<number>(0);

  const [setTime, setSetTime] = useState<number>(0);


  const exerciseData = useMemo<ExerciseDataType>(() => ({
    duration: exerciseTime,
    exercise_id: exercise.exercise.id,
    exercise_position: position,
    id,
    routine_data_id: routine.id,
    sets,
  }), [exercise.exercise.id, exerciseTime, id, position, routine.id, sets]);

  const onNavigate = useCallback((dir: 1 | -1) => {
    dispatch(setExerciseData(exerciseData));
    dispatch(setPosition(position + dir));

    setExerciseTime(0);
    setId(uuid());
    setSets([]);
    setSetTime(0);
  }, [dispatch, exerciseData, position]);

  const onAddSet = useCallback((set: Partial<SetFieldType>) => {
    setSets(p => [...p, set].map((s, i) => ({...s, position: i})) as SetFieldType[]);
  }, [])

  useEffect(() => {
    setsRef.current.scrollTop = setsRef.current.scrollHeight;
  }, [sets]);
  
  // Update exerciseData state fields with previous data (if exists)
  useEffect(() => {
    if (!prevExerciseData) return;

    setExerciseTime(prevExerciseData.duration);
    setId(prevExerciseData.id);
    setSets(prevExerciseData.sets);
  }, [prevExerciseData]);
  
  return (
    <>
      {routine && exercise && 
      <div className='Session'>
        <SessionHeader time={routineTime} setTime={setRoutineTime} routineTitle={routine.name} />
        <div className='Session-content'>
          <InfoBorder background={background} 
            title={exercise.exercise.name} 
            buttonText={exercise.exercise.notes ? 'See notes' : undefined}
            modalHeader='Exercise notes'
            modalContent={<p style={{whiteSpace: 'pre-wrap'}}>{exercise.exercise.notes}</p>}
          >
            <InfoBorder.HeaderLeft>
              <p className='Session-info'>{position + 1} <span className='Session-of'>of</span> {routine.exercises.length}</p>
            </InfoBorder.HeaderLeft>
            <InfoBorder.HeaderRight>
              <Timer className={'Session-info timer'} time={exerciseTime} setTime={setExerciseTime} />
            </InfoBorder.HeaderRight>

            {/* Setlist & Add Set Area */}
            <div className='Session-content-inner'>
              <div className='Session-content-sets hidescrollbar' ref={setsRef}>
                {sets.map(s => <SetField key={s.id} set={s} sets={sets} />)}
              </div>
              <AddSet onAddSet={onAddSet} setTime={setTime} setSetTime={setSetTime} exercise_data_id={exerciseData.id} />
            </div>
          </InfoBorder>
        </div>
        <SessionFooter onNavigate={onNavigate} routine={routine} currentPosition={position} />
      </div>
      }</>
  )
}