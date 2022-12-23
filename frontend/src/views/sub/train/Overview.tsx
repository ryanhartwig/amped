import { useEffect, useState } from 'react';
import { VscFlame } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { InfoBorder } from '../../../components/ui/InfoBorder';
import { RoutineType } from '../../../types/RoutineType';
import { useAppSelector } from '../../../utility/helpers/hooks';
import './Overview.css';

// interface OverviewProps {

// }

export const Overview = () => { 
  const navigate = useNavigate();

  const selectedRoutine = useAppSelector(s => s.session.selectedRoutine);

  const [routine, setRoutine] = useState<RoutineType>();
  const [intensity, setIntensity] = useState<true[]>([]);

  useEffect(() => {
    if (typeof selectedRoutine === 'string' || selectedRoutine?.type !== 'Routine') {
      navigate('/home/train');
      return;
    };

    setRoutine(selectedRoutine);
    setIntensity(Array(selectedRoutine.intensity).fill(true));
  }, [navigate, selectedRoutine]);

  return (
    <div className='Overview'>
      <h2>Overview</h2>
      
      {routine && <div className='Overview-routine'>
        <InfoBorder title={routine?.name} buttonText="See routine notes">
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

        </InfoBorder>
      </div>}
    </div>
  )
}