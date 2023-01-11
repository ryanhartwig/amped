import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '../../components/calendar/Calendar';
import { WeeklyTarget } from '../../components/stats/WeeklyTarget';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import './Dash.css';


// interface DashProps {

// }

export const Dash = () => {
  const navigate = useNavigate();

  // const [workouts] = useState<number>(3);

  const onTrain = useCallback(() => {
    navigate('/home/train');
  }, [navigate]);
  
  return (
    <div className='Dash'>
      <div style={{height: '35vh'}}>
        <Calendar />
      </div>

      <div className='Dash-weekly'>
        <WeeklyTarget />
      </div>

      <div className='Dash-train'>
        {/* <p>You have {workouts} workout{workouts !== 1 && 's'} scheduled for today</p> */}
        <PrimaryButton icon={'logo'} text={'Train'} style={{marginTop: 12}} onClick={onTrain}/>
      </div>
    </div>
  )
}