import './AddRoutine.css';

import { useCallback, useMemo, useState } from 'react';

/* React icons */
import { IoReturnDownBackSharp } from 'react-icons/io5';
import { Input } from '../../components/ui/Input';
import { Tag } from '../../components/ui/Tag';
import { RoutineType } from '../../types/RoutineType';
import uuid from 'react-uuid';
import { Routine } from '../../components/Routine';
import { useAppSelector } from '../../utility/hooks';

export const AddRoutine = () => {
  const { background_alt: background } = useAppSelector(s => s.theme);
  
  const [routineName, setRoutineName] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<Set<string>>(new Set());

  const routine = useMemo<RoutineType>(() => ({
    name: routineName || 'Routine name',
    exercises: [],
    intensity: 1,
    tags: Array.from(tags),
    id: uuid(),
    est_duration: 0,
  }), [routineName, tags]);

  const onSaveRoutine = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  const onAddTag = useCallback(() => {
    setTags(p => {
      const tags = new Set(p);
      tags.add(tag);
      setTag('');
      return tags;
    })
  }, [tag]);

  const onRemoveTag = useCallback((t: string) => {
    setTags(p => {
      const tags = new Set(p);
      tags.delete(t);
      return tags;
    })
  }, [])
  
  return (
    <div className='AddRoutine'>
      <h2>Add a new workout routine</h2>
      <hr></hr>
      
      <div className='AddRoutine-preview' style={{background}}>
        <Routine routine={routine} />
      </div>
      
      <form className='AddRoutine-form' onSubmit={onSaveRoutine}>
        
        
        <Input onChange={({target}) => setRoutineName(target.value)} 
          value={routineName}
          placeholder="Routine name" 
        />

        <div className='AddRoutine-addtag-wrapper'>
          <Input style={{paddingRight: 80}} 
            onChange={({target}) => setTag(target.value.toLowerCase())} 
            value={tag} 
            mini
            onEnter={onAddTag}
            placeholder="Tags (push, pull ...)"/>
          {!!tag.length && <div className='AddRoutine-enter'>
            <IoReturnDownBackSharp size={26} style={{color: 'grey'}}/>
            <p>add</p>
          </div>}
        </div>
        <div className='AddRoutine-tags hidescrollbar noselect'>
          {Array.from(tags).map(t => <Tag text={t} toggle='remove' onClick={() => onRemoveTag(t)} key={t} />)}
        </div>

      </form>
    </div>
  )
}