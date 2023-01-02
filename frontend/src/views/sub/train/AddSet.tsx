import { useCallback } from 'react';
import { useState } from 'react';
import { Counter } from '../../../components/ui/Counter';
import { Tag } from '../../../components/ui/Tag';
import { useAppSelector } from '../../../utility/helpers/hooks';
import './AddSet.css';

// interface AddSetProps {

// }

export const AddSet = () => {

  const { background_alt: background } = useAppSelector(s => s.theme);

  const [weight, setWeight] = useState<number>(90);
  const [reps, setReps] = useState<number>(0);

  const activeTags = new Set<string>();

  const toggleTag = useCallback(() => {}, []);

  return (
    <div className='AddSet' style={{background}}>
      <Counter value={weight} 
        setValue={setWeight}
        incrementBy={5}
      />
      <Counter value={reps} 
        setValue={setReps}
        incrementBy={1}
        mini
      />
      {['Warmup', 'Drop Set', 'Hit Failure'].map(t => 
        <Tag key={t} text={t} onClick={() => {}} />
      )}
    </div>
  )
}