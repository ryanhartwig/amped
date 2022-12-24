import './SessionFooter.css';

import { useAppSelector } from '../../utility/helpers/hooks';
import { IoIosFlash } from 'react-icons/io';
import { ReactIconButton } from '../ui/ReactIconButton';
import { InfoBorder } from '../ui/InfoBorder';
import { useNavigate } from 'react-router-dom';
import { RoutineType } from '../../types/RoutineType';

interface SessionFooterProps {
  currentPosition: number,
  routine: RoutineType,
  onNavigate: (dir: 1 | -1) => void,
}

export const SessionFooter = ({currentPosition, onNavigate, routine}: SessionFooterProps) => {
  const navigate = useNavigate();

  const { foreground: background } = useAppSelector(s => s.theme);
  const nextExercise = routine.exercises[currentPosition + 1]?.exercise.name || null;
  const prevExercise = routine.exercises[currentPosition - 1]?.exercise.name || null;

  
  
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