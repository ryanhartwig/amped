import { useState } from 'react';
import { useGetSetDataQuery } from '../../api/injections/data/setDataSlice';
import { ExerciseDataType } from '../../types/ExerciseDataType';
import { SetFieldType } from '../../types/SetFieldType';
import { useAppSelector } from '../../utility/helpers/hooks';
import { Dropdown } from '../ui/Dropdown';
import { FormatTime } from '../ui/FormatTime';
import './ExerciseStats.css';
import { SetField } from './SetField';

interface ExerciseStatsProps {
  exerciseData: ExerciseDataType,
}

export const ExerciseStats = ({exerciseData: d}: ExerciseStatsProps) => {

  const { background_routine: background } = useAppSelector(s => s.theme);
  const [showSets, setShowSets] = useState<boolean>(false);

  const { data: sets = [] } = useGetSetDataQuery(d.id) as { data: SetFieldType[] }; 

  return (
    <div className='ExerciseStats' style={{background}}>
      <div className='ExerciseStats-base' onClick={() => setShowSets(p => !p)}>
        <div className='ExerciseStats-position'>
          {d.exercise_position + 1}
        </div>
        <div className='ExerciseStats-info'>
          <div className='ExerciseStats-info-top'>
            <p>{d.exercise_name}</p>
            <FormatTime seconds={d.duration} 
              style={{fontSize: '13px', marginRight: 10, marginTop: 6, opacity: 0.6}} />
          </div>

          <Dropdown 
            label='Show Setlist' 
            open={showSets} 
            style={{opacity: 0.4, marginTop: 2}}
            className='ExerciseStats-dropdown'
          />
        </div>
      </div>
      {showSets && 
      <div className='ExerciseStats-sets'>
        {sets?.length 
          ? sets.map(s => <SetField set={s} sets={sets} key={s.id} />)
          : <p>No sets</p>
        }
      </div> }
    </div>
  )
}