import './AddRoutine.css';

/* React icons */
import { IoReturnDownBackSharp, IoTrash } from 'react-icons/io5';
import { AiFillStar, AiOutlineStar, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { VscFlame } from 'react-icons/vsc';

import { Routine } from '../../components/Routine';
import { useAppSelector } from '../../utility/hooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Tag } from '../../components/ui/Tag';
import { RoutineExercise, RoutineType } from '../../types/RoutineType';
import uuid from 'react-uuid';
import clsx from 'clsx';
import { Intensity } from '../../types';
import { ExerciseType } from '../../types/ExerciseType';
import { Exercise } from '../../components/Exercise';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { Modal } from '../../components/ui/Modal';
import { Search } from '../../components/search/Search';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../../store/slices/workoutsSlice';
import { useNavigate } from 'react-router-dom';

export const AddRoutine = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { background_alt: background } = useAppSelector(s => s.theme);
  
  const [routineName, setRoutineName] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [favourited, setFavourited ] = useState<boolean>(false);
  const [duration, setDuration] = useState<string>('');
  const [intensity, setIntensity] = useState<Intensity>(0);

  // Array of selected exercises (contains duplicates)
  const [exerciseList, setExerciseList] = useState<ExerciseType[]>([]);

  // Array of index-positioned exercise (duplicates are therefore uniquely identifiable)
  const [exercises, setExercises] = useState<RoutineExercise[]>(exerciseList.map((ex, i) => ({exercise: ex, position: i})));

  // Select exercises modal state
  const [open, setOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLParagraphElement>(undefined!);

  const routine = useMemo<RoutineType>(() => ({
    name: routineName || 'Routine name',
    exercises,
    intensity,
    type: 'Routine',
    tags: Array.from(tags),
    id: uuid(),
    est_duration: Number(duration || 1),
    favourited,
  }), [duration, exercises, favourited, intensity, routineName, tags]);

  const onSaveRoutine = useCallback(() => {
    dispatch(addWorkout(routine));
    navigate('/home/routines', { state: { name: routineName || 'Routine Name' }})
  }, [dispatch, navigate, routine, routineName]);

  useEffect(() => {
    setExercises(exerciseList.map((ex, i) => ({exercise: ex, position: i})))
  }, [exerciseList]);

  const onRemoveExercise = useCallback((exercise: RoutineExercise) => {
    setExerciseList(p => [...p.slice(0, exercise.position), ...p.slice(exercise.position + 1)])
  }, []);

  const onSaveSelection = useCallback((exercises: ExerciseType[]) => {
    setExerciseList(p => [...p, ...exercises]);
    setOpen(false);
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
          {exercises.map(e => 
            <div key={e.exercise.id + '' + e.position} className='AddRoutine-exercise'>
              <Exercise exercise={e.exercise} />
              <div className='AddRoutine-exercise-remove' onClick={() => onRemoveExercise(e)}>
                <IoTrash />
              </div>
            </div>
            )}
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
          <Search tab='Exercises' onSaveSelect={onSaveSelection} />
        </div>
      </Modal> 

    </div>
  )
}