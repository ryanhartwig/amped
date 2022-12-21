import './AddExercise.css';

/* React icons */
import { IoReturnDownBackSharp } from 'react-icons/io5';
import { AiFillStar, AiOutlineStar, AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import { VscFlame } from 'react-icons/vsc';

import { useAppSelector } from '../../utility/hooks';
import { useCallback, useMemo, useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Tag } from '../../components/ui/Tag';
import uuid from 'react-uuid';
import clsx from 'clsx';
import { Intensity } from '../../types';
import { ExerciseType } from '../../types/ExerciseType';
import { Exercise } from '../../components/Exercise';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { useDispatch } from 'react-redux';
import { addWorkout, editWorkout, removeWorkout } from '../../store/slices/workoutsSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const AddExercise = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const editing: ExerciseType | undefined = location.state?.edit;
  
  const { background_alt: background } = useAppSelector(s => s.theme);

  // Input value
  const [tag, setTag] = useState<string>('');
  
  // Routine properties
  const [exerciseName, setExerciseName] = useState<string>(editing?.name || '');
  const [target, setTarget] = useState<Set<string>>(new Set(editing?.muscle_targets));
  const [favourited, setFavourited ] = useState<boolean>(editing?.favourited || false);
  const [intensity, setIntensity] = useState<Intensity>(editing?.intensity || 0);
  const [notes, setNotes] = useState<string>(editing?.notes || '');
  const [goal, setGoal] = useState<string>(editing?.exercise_goal || 'Select exercise goal');

  const exercise = useMemo<ExerciseType>(() => ({
    name: exerciseName || 'Exercise name',
    intensity,
    type: 'Exercise',
    id: editing?.id || uuid(),
    notes: notes,
    exercise_goal: goal === 'Select exercise goal' ? 'Other' : goal,
    muscle_targets: Array.from(target),
    favourited,
  }), [exerciseName, intensity, editing?.id, notes, goal, target, favourited]);

  const onSaveExercise = useCallback(() => {
    if (editing) {
      dispatch(editWorkout(exercise));
      navigate('/home/routines', { state: { tag: 'Exercises' }})
      return;
    } 

    dispatch(addWorkout(exercise));
    navigate('/home/routines', { state: { name: exerciseName || 'Exercise Name', tag: 'Exercises' }})
  }, [dispatch, editing, navigate, exercise, exerciseName]);

  const onAddTag = useCallback(() => {
    if (!tag.length) return;
    setTarget(p => {
      const tags = new Set(p);
      tags.add(tag.trim());
      setTag('');
      return tags;
    })
  }, [tag]);

  const onRemoveTag = useCallback((t: string) => {
    setTarget(p => {
      const tags = new Set(p);
      tags.delete(t);
      return tags;
    })
  }, []);

  const onRemoveExercise = useCallback(() => {
    if (!editing) return;
    dispatch(removeWorkout(editing));
    navigate('/home/routines', { state: { tag: 'Exercises' }});
  }, [dispatch, editing, navigate]);

  return (
    <div className='AddExercise'>
      <h2>{editing ? 'Edit' : 'Add a new'} exercise</h2>
      <hr></hr>
      
      <div className='AddExercise-preview' style={{background}}>
        <Exercise exercise={exercise} />
      </div>
      <form className='AddExercise-form'>
        <div className='AddExercise-name'>
          <Input onChange={({target}) => setExerciseName(target.value)} 
            value={exerciseName}
            required
            style={{paddingLeft: 35}}
            placeholder="Exercise name" 
          />
          <div className='AddExercise-favourite' onClick={() => setFavourited(p => !p)}>
            {favourited ? <AiFillStar size={20}/> : <AiOutlineStar size={20}/>}
          </div>
        </div>
        
        <div className='AddExercise-goal'>
          <select id="exercise-goal" value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="Select exercise goal" disabled>Select exercise goal</option>
            <option value="Hypertrophy">Hypertrophy</option>
            <option value="Power">Power</option>
            <option value="Speed">Speed</option>
            <option value="Endurance">Endurance</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className='AddExercise-addtag-wrapper'>
          <Input style={{paddingRight: '60%'}} 
            onChange={({target}) => setTag(target.value.toLowerCase())} 
            value={tag} 
            mini
            onEnter={onAddTag}
            onBlur={onAddTag}
            placeholder="Muscle target(s)"
          />

          {/* Enter to add Icon / text */}
          {!!tag.length && 
            <div className='AddExercise-enter'>
              <IoReturnDownBackSharp size={26} style={{color: 'grey'}}/>
              <p>add</p>
            </div>}

          {/* Interactive tags */}
          {!!target.size && 
            <div className='AddExercise-tags hidescrollbar noselect'>
              {Array.from(target).map(t => <Tag key={t} text={t} toggle='remove' onClick={() => onRemoveTag(t)} />)}
            </div>}
        </div>
        
        <div className='AddExercise-intensity'>
          {Array(6).fill(true).map((x, i) => 
            <div key={uuid()}>
              {<div  onClick={() => setIntensity((i + 1 === 6 ? 0 : i + 1) as Intensity)} className={clsx('AddExercise-intensity-icon', {'fill': intensity > i})}>
                {i < 5 && <VscFlame size={26} style={{marginRight: 8}} />}
                {i === 5 && !!intensity && <AiOutlineClose size={18} style={{marginRight: 8, color: 'grey'}} />}
              </div>}
            </div>
          )}
        </div>

        <div className='AddExercise-notes'>
          <textarea value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            placeholder='Exercise notes' 
            className='AddExercise-notes-text' 
            style={{background}}
          />
        </div>

        {/* Fill space (maintains flex-start positioning with save at bottom) */}
        <div className='AddExercise-fill'>
        </div>
        

        {/* Select photos for exercise demonstration, etc (to be implemented) */}
        {/* <div className='AddExercise-media'>
          <PrimaryButton 
            text='Add media' 
            style={{
              height: '100%', 
              background: 'none', 
              border: '1px solid grey',
              width: '50%',
            }} 
            iconSize={13}
            fontSize={15}
          />
        </div> */}

        <div className='AddExercise-save'>
          <PrimaryButton text='Save' onClick={onSaveExercise} />
          {editing &&             
          <div className='AddExercise-remove' onClick={onRemoveExercise}>
            <AiOutlineDelete size={22} />
            <p style={{marginTop: 5}}>Delete Exercise</p>
          </div>
        }
        </div>        
      </form>

    </div>
  )
}