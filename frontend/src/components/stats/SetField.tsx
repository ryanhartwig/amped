import { BsDot } from 'react-icons/bs';
import { SetFieldType } from '../../types/SetFieldType';
import { FormatTime } from '../ui/FormatTime';
import './SetField.css';

interface SetFieldProps {
  set: SetFieldType,
}

export const SetField = ({set}: SetFieldProps) => {



  return (
    <div className='SetField'>
      <div>
        <p style={{fontSize: 13}}>Set {set.position + 1}</p>
        <BsDot style={{opacity: 0.2}} />
        <p style={{fontSize: 25}}>{set.weight}</p>
        <p style={{fontSize: 11, opacity: 0.4}}>lbs</p>
        <p style={{fontSize: 25, marginLeft: 8}}>{set.count}</p>
        <p style={{fontSize: 11, opacity: 0.4}}>reps</p>
      </div>
      <div>
        <p><FormatTime seconds={set.duration} style={{fontSize: '0.9em', opacity: 0.7}} /></p>
      </div>
    </div>
  )
}