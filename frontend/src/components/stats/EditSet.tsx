import './EditSet.css';

import React, { useCallback, useMemo, useState } from "react"
import { Modifier, SetFieldType } from "../../types/SetFieldType"
import { useToggleSet } from "../../utility/helpers/hooks/useToggleSet";
import { Counter } from "../ui/Counter";
import { LoginButton } from "../ui/LoginButton";
import { Tag } from "../ui/Tag";
import { Input } from '../ui/Input';

interface EditSetProps {
  set: SetFieldType,
  sets: SetFieldType[],
  setSets: React.Dispatch<React.SetStateAction<SetFieldType[]>>,
  setEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

export const EditSet: React.FC<EditSetProps> = ({set, sets, setSets, setEdit}) => {

  const id = useMemo<string>(() => set.id, [set.id]);
  const [weight, setWeight] = useState<number>(set.weight);
  const [reps, setReps] = useState<number>(set.count);
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set(set.modifiers));
  const [duration, setDuration] = useState<number>(set.duration);

  const tagColors = ['#725231', '#375c7d', '#6e2b2b'];

  const setField: SetFieldType = useMemo(() => ({
    id,
    count: reps,
    duration,
    performed_exercise_id: set.performed_exercise_id,
    position: set.position,
    modifiers: Array.from(activeTags) as Modifier[],
    weight,
  }), [activeTags, duration, id, reps, set.performed_exercise_id, set.position, weight]);

  const toggleTag = useToggleSet(activeTags, setActiveTags);

  const onToggleTag = useCallback((tag: string) => {
    const mutuallyExclusive = ['Warmup', 'Drop Set'].filter(t => t !== tag);
    const tags = [tag];

    if (tag !== 'Hit Failure' && activeTags.has(mutuallyExclusive[0])) {
      tags.push(mutuallyExclusive[0]);
    };

    toggleTag(...tags);
  }, [activeTags, toggleTag]);

  const onChangeDuration = useCallback((e: any) => {
    const { value } = e.target as { value: string};

    if (value.split('').some(c => isNaN(Number(c)))) return;

    setDuration(Number(value));
  }, []);

  const onSave = useCallback(() => {
    setSets(p => {
      const dup = [...p];
      dup[set.position] = setField;

      return dup;
    })
    setEdit(false);
  }, [set.position, setEdit, setField, setSets]);

  const onDelete = useCallback(() => {
    setSets(p => p.filter(sf => sf.id !== set.id).map((s, i) => ({...s, position: i})));
    setEdit(false);
  }, [set.id, setEdit, setSets]);

  return (
    <div className="EditSet">
      <div className='AddSet-counter'>
        <p className='AddSet-counter-label'>lbs</p>
        <Counter value={weight} 
          setValue={setWeight}
          background={'#181818'}
          incrementBy={5}
        />
      </div>
      <div className='AddSet-counter'>
        <p className='AddSet-counter-label'>reps</p>
        <Counter value={reps} 
          setValue={setReps}
          background={'#181818'}
          incrementBy={1}
          mini
        />
      </div>
      <div className='AddSet-counter'>
        <p className='AddSet-counter-label'>time (s)</p>
        <Input value={duration} onChange={onChangeDuration} style={{padding: 10, width: 100, margin: '0 auto'}} />
      </div>
      <div className='AddSet-modifiers hidescrollbar' style={{marginTop: 10}}>
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
      <div className="EditSet-actions">
        <LoginButton onClick={onSave} text="Save Edits" />
        <LoginButton onClick={onDelete} text="Discard Set" style={{marginTop: 10, borderColor: 'rgb(139, 50, 50)', color: 'rgb(200, 70, 70)'}}  />
      </div>
    </div>
  )
}