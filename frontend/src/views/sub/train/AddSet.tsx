import React, { useCallback, useMemo, useState } from 'react';
import uuid from 'react-uuid';
import { Counter } from '../../../components/ui/Counter';
import { SecondaryButton } from '../../../components/ui/SecondaryButton';
import { Tag } from '../../../components/ui/Tag';
import { Modifier, SetFieldType } from '../../../types/SetFieldType';
import { useAppSelector } from '../../../utility/helpers/hooks';
import { useToggleSet } from '../../../utility/helpers/hooks/useToggleSet';
import './AddSet.css';

interface AddSetProps {
  onAddSet: (set: Partial<SetFieldType>) => void,
  exercise_data_id: string,
  setTime: number,
  setSetTime: React.Dispatch<React.SetStateAction<number>>,
}

export const AddSet = ({onAddSet, setTime, setSetTime, exercise_data_id}: AddSetProps) => {

  const { background_alt: background } = useAppSelector(s => s.theme);

  const tagColors = ['#725231', '#375c7d', '#6e2b2b'];

  const [id, setId] = useState<string>(uuid());
  const [weight, setWeight] = useState<number>(90);
  const [reps, setReps] = useState<number>(5);
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const setField: Partial<SetFieldType> = useMemo(() => ({
    id,
    count: reps,
    duration: setTime,
    exercise_data_id,
    modifiers: Array.from(activeTags) as Modifier[],
    weight,
  }), [activeTags, exercise_data_id, id, reps, setTime, weight]);

  const toggleTag = useToggleSet(activeTags, setActiveTags);

  const onToggleTag = useCallback((tag: string) => {
    const mutuallyExclusive = ['Warmup', 'Drop Set'].filter(t => t !== tag);
    const tags = [tag];

    if (tag !== 'Hit Failure' && activeTags.has(mutuallyExclusive[0])) {
      tags.push(mutuallyExclusive[0]);
    };

    toggleTag(...tags);
  }, [activeTags, toggleTag]);

  const reset = useCallback(() => {
    setSetTime(0);
    setActiveTags(new Set());
    setId(uuid());
  }, [setSetTime]);

  const onAddSetField = useCallback(() => {
    onAddSet(setField);
    reset();
  }, [onAddSet, reset, setField]);


  return (
    <div className='AddSet noselect' style={{background}}>
      <div className='AddSet-counter'>
        <p className='AddSet-counter-label'>lbs</p>
        <Counter value={weight} 
          setValue={setWeight}
          incrementBy={5}
        />
      </div>
      <div className='AddSet-counter'>
        <p className='AddSet-counter-label'>reps</p>
        <Counter value={reps} 
          setValue={setReps}
          incrementBy={1}
          mini
        />
      </div>
      <div className='AddSet-modifiers hidescrollbar'>
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
      <SecondaryButton className='AddSet-time' 
        text={'Add set'} 
        time={setTime} 
        setTime={setSetTime} 
        onClick={onAddSetField}
      />
    </div>
  )
}