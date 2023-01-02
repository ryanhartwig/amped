import { useState } from 'react';
import { Counter } from '../../../components/ui/Counter';
import { SecondaryButton } from '../../../components/ui/SecondaryButton';
import { Tag } from '../../../components/ui/Tag';
import { useAppSelector } from '../../../utility/helpers/hooks';
import { useToggleSet } from '../../../utility/helpers/hooks/useToggleSet';
import './AddSet.css';

// interface AddSetProps {

// }

export const AddSet = () => {

  const { background_alt: background } = useAppSelector(s => s.theme);

  const tagColors = ['#725231', '#375c7d', '#6e2b2b'];

  const [weight, setWeight] = useState<number>(90);
  const [reps, setReps] = useState<number>(0);
  const [setTime, setSetTime] = useState<number>(0);

  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const onToggleTag = useToggleSet(activeTags, setActiveTags);

  return (
    <div className='AddSet' style={{background}}>
      <div className='AddSet-counters'>
        <Counter value={weight} 
          setValue={setWeight}
          incrementBy={5}
        />
        <Counter value={reps} 
          setValue={setReps}
          incrementBy={1}
          mini
        />
      </div>
      <div className='AddSet-modifiers noselect hidescrollbar'>
        {['Warmup', 'Drop Set', 'Hit Failure'].map((t, i) => 
          <Tag key={t} 
            text={t} 
            color={tagColors[i]}
            onClick={() => onToggleTag(t)} 
            toggle={activeTags.has(t) ? 'remove' : 'add'}
            matchColorText
            fontSize='13px'
          />
        )}
      </div>
      <SecondaryButton className='AddSet-time' text={'Add set'} time={setTime} setTime={setSetTime} />
    </div>
  )
}