import { useCallback, useEffect, useState } from 'react';
import { VscFlame } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Exercise } from '../../../components/Exercise';
import { InfoBorder } from '../../../components/ui/InfoBorder';
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
              {intensity.map((x, i) => <VscFlame key={i} />)}
            </div>
          </InfoBorder.FooterLeft>

          <div className='Overview-content'>
            <div className='Overview-exercises hidescrollbar' style={{background: background_alt}}>
              {routine.exercises.map((e, i) => <Exercise key={`${e.position}-${e.exercise}`} exercise={e.exercise} />)}
            </div>
            {routine.lastSessionNotes && <div className='Overview-lastnotes'>
              <p>Last session's notes</p>
              <div className='Overview-textarea' style={{background: background_alt}}>
                <p className='Overview-text'>{routine.lastSessionNotes}</p>
              </div>
            </div>}
          </div>
        </InfoBorder>
      </div>}
      {!inSession && <PrimaryButton onClick={onStartSession} className='Overview-start' text='Start' icon={'logo'} />}
    </div>
  )
}