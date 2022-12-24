import './SessionFooter.css';

import { useAppSelector } from '../../utility/helpers/hooks';
import { IoIosFlash } from 'react-icons/io';
import { ReactIconButton } from '../ui/ReactIconButton';
import { InfoBorder } from '../ui/InfoBorder';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPosition } from '../../store/slices/sessionSlice';
import { useNavigate } from 'react-router-dom';
import { RoutineType } from '../../types/RoutineType';
import { ExerciseDataType } from '../../types/ExerciseDataType';

interface SessionFooterProps {
  currentPosition: number,
  routine: RoutineType,
  exerciseData: ExerciseDataType,
}

export const SessionFooter = ({currentPosition, exerciseData, routine}: SessionFooterProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { foreground: background } = useAppSelector(s => s.theme);
  const nextExercise = routine.exercises[currentPosition + 1]?.exercise.name || null;
  const prevExercise = routine.exercises[currentPosition - 1]?.exercise.name || null;

  const onNavigate = useCallback((dir: 1 | -1) => {
    dispatch(setPosition(currentPosition + dir))
  }, [currentPosition, dispatch]);
  
  return (
    <div className='SessionFooter' style={{background}}>
      <div className='SessionFooter-items'>
        <div className='SessionFooter-nav-button'>
          {!!prevExercise && <InfoBorder background={background} style={{borderRadius: '7px', borderColor: 'rgba(255,255,255,0.2'}}>
            <InfoBorder.HeaderLeft><p className='SessionFooter-nav-text'>Previous</p></InfoBorder.HeaderLeft>
            <div className='SessionFooter-button-text' onClick={() => onNavigate(-1)}>
              <p>{prevExercise}</p>
            </div>
          </InfoBorder>}
        </div>
        <ReactIconButton 
          text="Pause" 
          buttonSize='55px' fontSize='13px' 
          active
          onClick={() => navigate('/home/train/overview')}
          style={{flex: '0 0'}}
        >
          <IoIosFlash size={30}/>
        </ReactIconButton>
        <div className='SessionFooter-nav-button'>
          <InfoBorder background={background} style={{borderRadius: '7px', borderColor: 'rgba(255,255,255,0.2'}}>
            <InfoBorder.HeaderRight><p className='SessionFooter-nav-text'>Next</p></InfoBorder.HeaderRight>
            <div className='SessionFooter-button-text' onClick={() => onNavigate(1)}>
              <p>{nextExercise || 'Summary'}</p>
            </div>
          </InfoBorder>
        </div>
      </div>
    </div>
  )
}