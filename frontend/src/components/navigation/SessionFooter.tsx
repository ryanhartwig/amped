import './SessionFooter.css';

import { useAppSelector } from '../../utility/helpers/hooks';
import { IoIosFlash } from 'react-icons/io';
import { ReactIconButton } from '../ui/ReactIconButton';
import { InfoBorder } from '../ui/InfoBorder';
import { useNavigate } from 'react-router-dom';
import { RoutineType } from '../../types/RoutineType';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal } from '../ui/Modal';
import { PrimaryButton } from '../ui/PrimaryButton';
import { RoutineDataType } from '../../types/RoutineDataType';
import { useAddRoutineDataMutation, useDeleteRoutineDataMutation } from '../../api/injections/data/routineDataSlice';
import { useAddExerciseDataMutation } from '../../api/injections/data/exerciseDataSlice';
import { useAddSetDataMutation } from '../../api/injections/data/setDataSlice';
import { useDispatch } from 'react-redux';
import { addRoutineExercise, setRoutineSummaryId } from '../../store/slices/sessionSlice';
import { ExerciseType } from '../../types/ExerciseType';
import { Search } from '../search/Search';

interface SessionFooterProps {
  currentPosition: number,
  onNavigate: (dir: 1 | -1) => void,
  routineData: RoutineDataType,
  setPaused: React.Dispatch<React.SetStateAction<boolean>>,
  paused: boolean,
  anonymous?: boolean,
}

export const SessionFooter = ({currentPosition, setPaused, paused, routineData, onNavigate, anonymous = false}: SessionFooterProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const position = useAppSelector(s => s.session.currentPosition);
  const { foreground: background } = useAppSelector(s => s.theme);
  const exercises = useAppSelector(s => s.session.exercises);

  const nextExercise = exercises[currentPosition + 1]?.exercise.name || null;
  const prevExercise = exercises[currentPosition - 1]?.exercise.name || null;

  const [open, setOpen] = useState<boolean>(false);
  const [subOpen, setSubOpen] = useState<boolean>(false);

  const [addRoutineData] = useAddRoutineDataMutation();
  const [deleteRoutineData] = useDeleteRoutineDataMutation();

  const [addExerciseData] = useAddExerciseDataMutation();
  const [addSetData] = useAddSetDataMutation();

  const [disabled, setDisabled] = useState<boolean>(false);

  const [selecting, setSelecting] = useState<boolean>(false);
  const [selected, setSelected] = useState<RoutineType | ExerciseType>()

  const onFinish = useCallback(() => {
    ;(async () => {
      setDisabled(true);
      let routineId: string | undefined;
      try {
        // Add routineData
        const { id } = await addRoutineData(routineData).unwrap();
        routineId = id;

        // Add exerciseData
        await Promise.all(routineData.exerciseData.map(async (e) => {
          return await addExerciseData(e).unwrap();
        }))

        // Add setData
        await Promise.all(routineData.exerciseData.map(async (e) => {
          return await Promise.all(e.sets.map(async (s) => {
            return await addSetData(s).unwrap();
          }))
        }))
        
        setOpen(false); 
        setSubOpen(false);
        dispatch(setRoutineSummaryId(routineData.id))
        navigate('/home/train');
      } catch(e) {
        if (routineId) {
          // cascades, therefore any created exercise / set data will also be deleted
          await deleteRoutineData(routineId).unwrap();
        }
      } finally {
        setDisabled(false);
      }
    })()
  }, [addExerciseData, addRoutineData, addSetData, deleteRoutineData, dispatch, navigate, routineData]);
  
  // Navigate forward after updating redux store with exercise data in custom sessions
  const allowAdvance = useRef<boolean>(false);
  useEffect(() => {
    if (exercises.length > position && allowAdvance.current) {
      onNavigate(1);
      setSelecting(false);
      allowAdvance.current = false;
      setDisabled(false);
    }
  }, [exercises.length, onNavigate, position, selected]);
  
  // On continuing custom session (selecting exercise)
  const onContinue = useCallback(() => {
    if (!selected || selected.type === 'Routine') return;

    dispatch(addRoutineExercise({
      exercise: selected,
      exercise_id: '',
      id: '',
      position: exercises.length,
      routine_id: '',
      user_id: '',
    }));
    setSelected(undefined);
    onNavigate(1);
    setDisabled(true);
    setTimeout(() => {
      allowAdvance.current = true;
    }, 1);
  }, [dispatch, exercises.length, onNavigate, selected]);
  
  return (
    <div className='SessionFooter' style={{background}}>
      <div className='SessionFooter-items'>
        <div className='SessionFooter-nav-button'>
          {!!prevExercise && !paused && 
          <InfoBorder isButton background={background} style={{borderRadius: '7px', borderColor: 'rgba(255,255,255,0.2'}}>
            <InfoBorder.HeaderLeft><p className='SessionFooter-nav-text'>Previous</p></InfoBorder.HeaderLeft>
            <div className='SessionFooter-button-text' onClick={() => onNavigate(-1)}>
              <p>{prevExercise}</p>
            </div>
          </InfoBorder>}
        </div>
        <ReactIconButton 
          text={paused ? 'Resume' : 'Pause'}
          buttonSize='55px' fontSize='13px' 
          active
          onClick={() => setPaused(p => !p)}
          style={{flex: '0 0'}}
        >
          <IoIosFlash size={30}/>
        </ReactIconButton>
        <div className='SessionFooter-nav-button'>
          { !paused && 
          <InfoBorder isButton background={background} style={{borderRadius: '7px', borderColor: 'rgba(255,255,255,0.2'}}>
            <InfoBorder.HeaderRight><p className='SessionFooter-nav-text'>Next</p></InfoBorder.HeaderRight>
            <div className='SessionFooter-button-text' 
              onClick={ 
                nextExercise 
                  ? () => onNavigate(1)
                  : anonymous 
                    ? () => {
                      onNavigate(1);
                      setSelecting(true);
                    }
                    : () => {
                      onNavigate(1);
                      setOpen(true);
                    }
              }
            >
              <p>{nextExercise || (anonymous ? 'Select / Finish' : 'Summary')}</p>
            </div>
          </InfoBorder>}
        </div>
      </div>

      {/* Select next exercise or finish */}
      <Modal onClose={() => setSelecting(false)} 
        open={selecting} 
        closeText='Cancel'
      >
        <div className='SessionFooter-select'>
          <div className='Train-routines-search'>
            <Search selected={selected} setSelected={setSelected} tab='Exercises' />
          </div>
          <div style={{flexShrink: 0, flexGrow: 0, width: '100%'}}>
            <PrimaryButton altColor onClick={onContinue} style={{marginTop: 8, width: '90%', maxWidth: 320, minWidth: 0}} text={selected ? 'Continue' : 'Select an exercise'} disabled={!selected} />
            <p style={{fontSize: '0.8em', opacity: 0.6, margin: '7px 0'}}>or</p>
            <PrimaryButton onClick={() => setSubOpen(true)} style={{marginBottom: 10, width: '90%', maxWidth: 320, minWidth: 0}} text={'Finish Workout'} disabled={disabled}/>
          </div>
        </div>
        <Modal onClose={() => setSubOpen(false)} 
          open={subOpen} 
          closeText='Not yet'
        >
          <Modal.Header>Finish workout?</Modal.Header>
          <div className='SessionFooter-finish'>
            <p style={{fontSize: '0.8em', opacity: 0.6}}>You will not be able to return</p>
            <PrimaryButton onClick={disabled ? undefined : onFinish} disabled={disabled} icon={'logo'} text='Finish' className='SessionFooter-finish-button' />
          </div>
        </Modal>
      </Modal>

      {/* Confirm finish */}
      <Modal onClose={() => setOpen(false)} 
          open={open} 
          closeText='Not yet'
        >
          <Modal.Header>Finish workout?</Modal.Header>
          <div className='SessionFooter-finish'>
            <p style={{fontSize: '0.8em', opacity: 0.6}}>You will not be able to return</p>
            <PrimaryButton onClick={disabled ? undefined : onFinish} disabled={disabled} icon={'logo'} text='Finish' className='SessionFooter-finish-button' />
          </div>
        </Modal>
    </div>
  )
}