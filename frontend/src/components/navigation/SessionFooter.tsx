import './SessionFooter.css';

import { useAppSelector } from '../../utility/helpers/hooks';
import { IoIosFlash } from 'react-icons/io';
import { ReactIconButton } from '../ui/ReactIconButton';
import { InfoBorder } from '../ui/InfoBorder';
import { useNavigate } from 'react-router-dom';
import { RoutineType } from '../../types/RoutineType';
import React, { useCallback, useState } from 'react';
import { Modal } from '../ui/Modal';
import { PrimaryButton } from '../ui/PrimaryButton';
import { RoutineDataType } from '../../types/RoutineDataType';
import { useAddRoutineDataMutation, useDeleteRoutineDataMutation } from '../../api/injections/data/routineDataSlice';
import { useAddExerciseDataMutation } from '../../api/injections/data/exerciseDataSlice';
import { useAddSetDataMutation } from '../../api/injections/data/setDataSlice';

interface SessionFooterProps {
  currentPosition: number,
  routine: RoutineType,
  onNavigate: (dir: 1 | -1) => void,
  routineTime: number,
  routineData: RoutineDataType,
  setPaused: React.Dispatch<React.SetStateAction<boolean>>,
  paused: boolean,
}

export const SessionFooter = ({currentPosition, setPaused, paused, routineData, routineTime, onNavigate, routine}: SessionFooterProps) => {
  const navigate = useNavigate();

  const { foreground: background } = useAppSelector(s => s.theme);
  const nextExercise = routine.exercises[currentPosition + 1]?.exercise.name || null;
  const prevExercise = routine.exercises[currentPosition - 1]?.exercise.name || null;

  const [open, setOpen] = useState<boolean>(false);

  const [addRoutineData] = useAddRoutineDataMutation();
  const [deleteRoutineData] = useDeleteRoutineDataMutation();

  const [addExerciseData] = useAddExerciseDataMutation();
  const [addSetData] = useAddSetDataMutation();

  const onFinish = useCallback(() => {
    (async () => {
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
        navigate('/home/train');
      } catch(e) {
        if (routineId) {
          // cascades, therefore any created exercise / set data will also be deleted
          await deleteRoutineData(routineId).unwrap();
        }
      }
    })()
  }, [addExerciseData, addRoutineData, addSetData, deleteRoutineData, navigate, routineData]);
  
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
              onClick={ nextExercise 
                ? () => onNavigate(1)
                : () => {
                  onNavigate(1);
                  setOpen(true);
                }}
            >
              <p>{nextExercise || 'Summary'}</p>
            </div>
          </InfoBorder>}
        </div>
      </div>

      <Modal onClose={() => setOpen(false)} 
        open={open} 
        closeText='Not yet'
        onClick={onFinish}
      >
        <Modal.Header>Finish workout?</Modal.Header>
        <div className='SessionFooter-finish'>
          <p style={{fontSize: '0.8em', opacity: 0.6}}>You will not be able to return</p>
          <PrimaryButton icon={'logo'} text='Finish' className='SessionFooter-finish-button' />
        </div>
      </Modal>
    </div>
  )
}