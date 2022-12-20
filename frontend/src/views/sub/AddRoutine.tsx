import './AddRoutine.css';

/* React icons */
import { IoReturnDownBackSharp } from 'react-icons/io5';
import { AiFillStar, AiOutlineStar, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

import { Routine } from '../../components/Routine';
import { useAppSelector } from '../../utility/hooks';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Tag } from '../../components/ui/Tag';
import { RoutineType } from '../../types/RoutineType';
import uuid from 'react-uuid';
import { VscFlame } from 'react-icons/vsc';
import clsx from 'clsx';
import { Intensity } from '../../types';
import { ExerciseType } from '../../types/ExerciseType';
import { Exercise } from '../../components/Exercise';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { Modal } from '../../components/ui/Modal';
import { Search } from '../../components/search/Search';

export const AddRoutine = () => {
  const { background_alt: background } = useAppSelector(s => s.theme);
  
  const [routineName, setRoutineName] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [favourited, setFavourited ] = useState<boolean>(false);
  const [duration, setDuration] = useState<string>('');
  const [intensity, setIntensity] = useState<Intensity>(0);
  const [exercises] = useState<ExerciseType[]>([]);

  // Select exercises modal state
  const [open, setOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLParagraphElement>(undefined!);

  const routine = useMemo<RoutineType>(() => ({
    name: routineName || 'Routine name',
    exercises,
    intensity,
    tags: Array.from(tags),
    id: uuid(),
    est_duration: Number(duration || 1),
    favourited,
  }), [duration, exercises, favourited, intensity, routineName, tags]);

  const onSaveRoutine = useCallback((e: any) => {

  }, []);

  const onAddTag = useCallback(() => {
    if (!tag.length) return;
    setTags(p => {
      const tags = new Set(p);
      tags.add(tag.trim());
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
  }, []);

  const onSelectExercises = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <div className='AddRoutine'>
      <h2>Add a new workout routine</h2>
      <hr></hr>
      
      <div className='AddRoutine-preview' style={{background}}>
        <Routine routine={routine} />
      </div>
      <form className='AddRoutine-form'>
        <div className='AddRoutine-name'>
          <Input onChange={({target}) => setRoutineName(target.value)} 
            value={routineName}
            required
            style={{paddingLeft: 35}}
            placeholder="Routine name" 
          />
          <div className='AddRoutine-favourite' onClick={() => setFavourited(p => !p)}>
            {favourited ? <AiFillStar size={20}/> : <AiOutlineStar size={20}/>}
          </div>
        </div>

        <div className='AddRoutine-duration'>
          <Input value={duration}
            placeholder='Approximate duration' 
            onChange={(e) => {
              if (!e.target.value.length) return setDuration('');
              const num = Number(e.target.value);
              setDuration('' + Math.max(Math.min(num, 999), 1));
            }}
            type='number'
            mini/>
          {duration && <p className='AddRoutine-min' style={{left: 12 + (duration.length * 10)}}>minutes</p>}
        </div>

        <div className='AddRoutine-addtag-wrapper'>
          <Input style={{paddingRight: '60%'}} 
            onChange={({target}) => setTag(target.value.toLowerCase())} 
            value={tag} 
            mini
            onEnter={onAddTag}
            onBlur={onAddTag}
            placeholder="Tags (push, pull ...)"/>

          {/* Enter to add Icon / text */}
          {!!tag.length && 
            <div className='AddRoutine-enter'>
              <IoReturnDownBackSharp size={26} style={{color: 'grey'}}/>
              <p>add</p>
            </div>}

          {/* Interactive tags */}
          {!!tags.size && 
            <div className='AddRoutine-tags hidescrollbar noselect'>
              {Array.from(tags).map(t => <Tag key={t} text={t} toggle='remove' onClick={() => onRemoveTag(t)} />)}
            </div>}
        </div>
        
        <div className='AddRoutine-intensity'>
          {Array(6).fill(true).map((x, i) => 
            <div key={uuid()}>
              {<div  onClick={() => setIntensity((i + 1 === 6 ? 0 : i + 1) as Intensity)} className={clsx('AddRoutine-intensity-icon', {'fill': intensity > i})}>
                {i < 5 && <VscFlame size={26} style={{marginRight: 8}} />}
                {i === 5 && !!intensity && <AiOutlineClose size={18} style={{marginRight: 8, color: 'grey'}} />}
              </div>}
            </div>
          )}
        </div>

        <div className='AddRoutine-exercises hidescrollbar' style={{background}}>
          {exercises.map(e => <Exercise key={e.id} exercise={e} />)}
          <div className='AddRoutine-add-exercise'>
            <AiOutlinePlus size={19} style={{opacity: 0.3}}/>
            <p ref={triggerRef} onClick={onSelectExercises}>Select exercises</p>
          </div>
        </div>

        <div className='AddRoutine-save'>
          <PrimaryButton text='Save' onClick={onSaveRoutine} />
        </div>        
      </form>
      
      <Modal closeText='Cancel'
        open={open} 
        onClose={() => setOpen(false)} 
        triggerRef={triggerRef} 
      >
        <Modal.Header>Select Exercises</Modal.Header>
        <div className='AddRoutine-search'>
          <Search tab='Exercises' />
        </div>
      </Modal> 

    </div>
  )
}