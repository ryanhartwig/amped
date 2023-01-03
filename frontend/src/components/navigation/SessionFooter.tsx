import './SessionFooter.css';

import { useAppSelector } from '../../utility/helpers/hooks';
import { IoIosFlash } from 'react-icons/io';
import { ReactIconButton } from '../ui/ReactIconButton';
import { InfoBorder } from '../ui/InfoBorder';
import { useNavigate } from 'react-router-dom';
import { RoutineType } from '../../types/RoutineType';
import { useRef, useState } from 'react';
import { Modal } from '../ui/Modal';
import { PrimaryButton } from '../ui/PrimaryButton';

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

  const [open, setOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLDivElement>(undefined!);
  
  return (
    <div className='SessionFooter' style={{background}}>
      <div className='SessionFooter-items'>
        <div className='SessionFooter-nav-button'>
          {!!prevExercise && <InfoBorder isButton background={background} style={{borderRadius: '7px', borderColor: 'rgba(255,255,255,0.2'}}>
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
          <InfoBorder isButton background={background} style={{borderRadius: '7px', borderColor: 'rgba(255,255,255,0.2'}}>
            <InfoBorder.HeaderRight><p className='SessionFooter-nav-text'>Next</p></InfoBorder.HeaderRight>
            <div className='SessionFooter-button-text' 
              ref={triggerRef}
              onClick={ nextExercise 
                ? () => onNavigate(1)
                : () => setOpen(true) }
            >
              <p>{nextExercise || 'Summary'}</p>
            </div>
          </InfoBorder>
        </div>
      </div>

      <Modal onClose={() => setOpen(false)} 
        open={open} 
        triggerRef={triggerRef} 
        closeText='Not yet'
        onClick={() => navigate('/home/train/summary')}
      >
        <Modal.Header>Finish workout?</Modal.Header>
        <div className='SessionFooter-finish'>
          <p style={{fontSize: '0.8em', opacity: 0.6}}>You will not be able to return</p>
          <PrimaryButton text='Finish' className='SessionFooter-finish-button' />
        </div>
      </Modal>
    </div>
  )
}