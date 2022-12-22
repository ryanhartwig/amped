import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (typeof selectedRoutine === 'string' || selectedRoutine?.type !== 'Routine') {
      navigate('/home/train');
      return;
    };

    setRoutine(selectedRoutine);
  }, [navigate, selectedRoutine]);

  return (
    <div className='Overview'>
      <h2>Overview</h2>
      
      <div className='Overview-routine'>
        <InfoBorder title={routine?.name}>
          <InfoBorder.HeaderLeft>45 min</InfoBorder.HeaderLeft>
          <InfoBorder.HeaderRight>5</InfoBorder.HeaderRight>
          <InfoBorder.FooterLeft>things</InfoBorder.FooterLeft>
          <InfoBorder.FooterRight>wow!</InfoBorder.FooterRight>

          <p>more things</p>
        </InfoBorder>
      </div>
    </div>
  )
}