import { useCallback, useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { VscFlame } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Exercise } from '../../../components/Exercise';
import { InfoBorder } from '../../../components/ui/InfoBorder';
import { Modal } from '../../../components/ui/Modal';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { initializeSession } from '../../../store/slices/sessionSlice';
import { RoutineType } from '../../../types/RoutineType';
import { useAppSelector } from '../../../utility/helpers/hooks';
import './Overview.css';

interface OverviewProps {
  inSession?: boolean,
}

export const Overview = ({inSession}: OverviewProps) => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedRoutineId = useAppSelector(s => s.session.selectedRoutineId);
  const selectedRoutine = useAppSelector(s => s.workouts.routines).find(r => r.id === selectedRoutineId);
  const { background_alt, background } = useAppSelector(s => s.theme);

  const [routine, setRoutine] = useState<RoutineType>();
  const [intensity, setIntensity] = useState<true[]>([]);
  const [quitPrompt, setQuitPrompt] = useState<boolean>(false);

  const currentPosition = useAppSelector(s => s.session.currentPosition);

  useEffect(() => {
    if (!selectedRoutine) {
      navigate('/home/train');
      return;
    };
    setRoutine(selectedRoutine);
    setIntensity(Array(selectedRoutine.intensity).fill(true));
  }, [navigate, selectedRoutine]);

  const onStartSession = useCallback(() => {
    dispatch(initializeSession());
    navigate('/session')
  }, [dispatch, navigate]);

  return (
    <div className='Overview'>
      {routine && <div className='Overview-routine'>
        <InfoBorder background={background} title={routine?.name} >
          <InfoBorder.HeaderLeft>
            <p className='Overview-info'>{routine.est_duration} min</p>
          </InfoBorder.HeaderLeft>
          <InfoBorder.HeaderRight>
            <p className='Overview-info'>{routine.exercises.length} exercises</p>
          </InfoBorder.HeaderRight>
          <InfoBorder.FooterLeft>
            <div className='Overview-info' style={{color: 'rgb(107, 77, 59)'}}>
              {intensity.map((_, i) => <VscFlame key={i} />)}
            </div>
          </InfoBorder.FooterLeft>

          <div className='Overview-content'>
            <div className='Overview-exercises hidescrollbar' style={{background: background_alt}}>
              {routine.exercises.map((e, i) => <Exercise key={`${e.id}`} selected={inSession && currentPosition === i ? e.exercise : undefined} exercise={e.exercise} />)}
            </div>
            {routine.prev_notes && <div className='Overview-lastnotes'>
              <p>Last session's notes</p>
              <div className='Overview-textarea' style={{background: background_alt}}>
                <p className='Overview-text'>{routine.prev_notes}</p>
              </div>
            </div>}
          </div>
        </InfoBorder>
      </div>}
      {!inSession 
      ? <PrimaryButton onClick={onStartSession} className='Overview-start' text='Start' icon={'logo'} />
      : <PrimaryButton text='Quit Session' onClick={() => setQuitPrompt(true)} className='Overview-start' icon={BiTrash} style={{background: '#6F2323', marginBottom: 75}} />}

      <Modal open={quitPrompt} onClose={() => setQuitPrompt(false)} className='Overview-quit-prompt' closeText='Cancel'>
        <Modal.Header>End Session?</Modal.Header>
        <div className='Overview-quit-prompt-content'>
          <p>You will lose all recorded performance metrics & exercise data for this session.</p>
          <PrimaryButton style={{background: '#6F2323', marginBottom: 35, minWidth: 0  }} text='Quit' onClick={() => navigate('/home/train')} />
        </div>
      </Modal>
    </div>
  )
}