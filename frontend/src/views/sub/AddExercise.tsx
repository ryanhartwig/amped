import './AddExercise.css';

/* React icons */
import { IoReturnDownBackSharp } from 'react-icons/io5';
import { AiOutlineClose, AiOutlineDelete, AiOutlineCheckCircle } from 'react-icons/ai';
import { VscFlame } from 'react-icons/vsc';
import { IoIosFlash, IoIosFlashOff } from 'react-icons/io';

import uuid from 'react-uuid';
import clsx from 'clsx';
import { useAppSelector } from '../../utility/helpers/hooks';
import { useCallback, useMemo, useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Tag } from '../../components/ui/Tag';
import { Intensity } from '../../types';
import { ExerciseType } from '../../types/ExerciseType';
import { Exercise } from '../../components/Exercise';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAddNewExerciseMutation, useDeleteExerciseMutation, useEditExerciseMutation } from '../../api/injections/workouts/exercisesSlice';
import { LoginButton } from '../../components/ui/LoginButton';
import { Modal } from '../../components/ui/Modal';

export const AddExercise = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editing: ExerciseType | undefined = location.state?.edit;
  
  const { background_alt: background } = useAppSelector(s => s.theme);
  const user_id = useAppSelector(s => s.user.id);

  // Input value
  const [tag, setTag] = useState<string>('');
  
  // Routine properties
  const [exerciseName, setExerciseName] = useState<string>(editing?.name || '');
  const [target, setTarget] = useState<Set<string>>(new Set(editing?.muscle_targets));
  const [favourited, setFavourited ] = useState<boolean>(editing?.favourited || false);
  const [intensity, setIntensity] = useState<Intensity>(editing?.intensity || 0);
  const [notes, setNotes] = useState<string>(editing?.notes || '');
  const [goal, setGoal] = useState<string>(editing?.exercise_goal || 'Other');
  const [editGoal, setEditGoal] = useState<boolean>(false);

  const exercise = useMemo<ExerciseType>(() => ({
    name: exerciseName || 'Exercise name',
    user_id: user_id,
    intensity,
    type: 'Exercise',
    id: editing?.id || uuid(),
    notes: notes?.length ? notes : null,
    exercise_goal: goal,
    muscle_targets: Array.from(target),
    favourited,
  }), [editing?.id, exerciseName, favourited, goal, intensity, notes, target, user_id]);

  const [addExercise] = useAddNewExerciseMutation();
  const [editExercise] = useEditExerciseMutation();
  const [removeExercise] = useDeleteExerciseMutation();

  const onSaveExercise = useCallback(() => {
    const edit = async () => {
      try {
        editExercise(exercise);
        navigate('/home/routines', { state: { tag: 'Exercises' }})
      } catch(e) {
        console.log(e)
      }
    }
    const add = async () => {
      try {
        addExercise(exercise);
        navigate('/home/routines', { state: { name: exerciseName || 'Exercise Name', tag: 'Exercises' }})
      } catch(e) {
        console.log(e);
      }
    }

    editing ? edit() : add();
  }, [addExercise, editExercise, editing, exercise, exerciseName, navigate]);

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
    const remove = async () => {
      try {
        removeExercise(exercise.id);
        navigate('/home/routines', { state: { tag: 'Exercises' }});

      } catch(e) {
        console.log(e);
      }
    }
    
    remove();
  }, [exercise.id, navigate, removeExercise]);

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
            {favourited ? <IoIosFlash size={20}/> : <IoIosFlashOff size={20} style={{color: 'grey'}} />}
          </div>
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

        {/* Exercise Goal */}
        <LoginButton onClick={() => setEditGoal(true)} className='AddExercise-goal' text='Select Exercise Goal'></LoginButton>

        {/* Fill space (maintains flex-start positioning with save at bottom) */}
        <div className='AddExercise-fill'>
        </div>

        <div className='AddExercise-save'>
          <PrimaryButton icon={AiOutlineCheckCircle} style={{minWidth: 0}} text='Save' onClick={onSaveExercise} />
          {editing &&             
          <div className='AddExercise-remove' onClick={onRemoveExercise}>
            <AiOutlineDelete size={22} />
            <p style={{marginTop: 5}}>Delete Exercise</p>
          </div>
        }
        </div>        
      </form>

      <Modal open={editGoal} onClose={() => setEditGoal(false)} closeText='Close'>
        <Modal.Header>Select Training Goal</Modal.Header>
        <div className='AddExercise-select'>
          {['Strength', 'Hypertrophy', 'Power', 'Speed', 'Endurance', 'Other']
            .map(g => 
              <LoginButton className='AddExercise-option' text={g} style={{opacity: goal === g ? 1 : 0.5}} onClick={() => setGoal(g)} />
            )
          }
        </div>
      </Modal>
    </div>
  )
}