import './AddRoutine.css';

/* React icons */
import { IoReturnDownBackSharp, IoTrash } from 'react-icons/io5';
import { AiOutlineClose, AiOutlinePlus, AiOutlineDelete, AiOutlineCheckCircle } from 'react-icons/ai';
import { VscFlame } from 'react-icons/vsc';

import { Routine } from '../../components/Routine';
import { useAppSelector } from '../../utility/helpers/hooks';
import { useCallback, useMemo, useRef, useState } from 'react';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosFlash, IoIosFlashOff } from 'react-icons/io';
import { useAddNewRoutineMutation, useEditRoutineMutation, useDeleteRoutineMutation } from '../../api/injections/workouts/routinesSlice';
import { DB_RoutineExercise, useAddRoutineExerciseMutation, useDeleteRoutineExerciseMutation } from '../../api/injections/workouts/relationsSlice';
import { useEditRoutineDataMutation } from '../../api/injections/data/routineDataSlice';
import { LoginButton } from '../../components/ui/LoginButton';
import { useAddScheduleMutation, useDeleteScheduleMutation } from '../../api/injections/user/scheduledSlice';
import { ScheduledRoutine } from '../../types/scheduledState';


export const AddRoutine = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editing: RoutineType | undefined = location.state?.edit;

  const { background_alt: background } = useAppSelector(s => s.theme);
  const user_id = useAppSelector(s => s.user.id);
  const routineData = useAppSelector(s => s.workoutData.routineData);

  // Input value
  const [tag, setTag] = useState<string>('');
  
  // Routine properties
  const [routineName, setRoutineName] = useState<string>(editing?.name || '');
  const [tags, setTags] = useState<Set<string>>(new Set(editing?.tags));
  const [favourited, setFavourited ] = useState<boolean>(editing?.favourited || false);
  const [duration, setDuration] = useState<string>(editing?.est_duration?.toString() || '');
  const [intensity, setIntensity] = useState<Intensity>(editing?.intensity || 0);
  const [selectExerciseOpen, setSelectExerciseOpen] = useState<boolean>(false);

  const [editScheduled, setEditScheduled] = useState<boolean>(false);

  const existingDays = useAppSelector(s => s.user.scheduled).filter(s => s.routine_id === editing?.id);
  const prevDays = useRef(new Set(existingDays.map(s => [s.day[0].toUpperCase(), ...s.day.split('').slice(1)].join(''))));
  const prevState = useMemo(() => {
    const map = new Map<string, ScheduledRoutine | null>();
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].forEach(day => {
      let existing = existingDays.find(sr => sr.day === day);
      map.set(day, existing || null)
    });

    return map;
  }, [existingDays]);

  const [days, setDays] = useState(new Set<string>(prevDays.current));

  // Array of selected exercises (contains duplicates)
  const [exercises, setExercises] = useState<RoutineExercise[]>(editing?.exercises || []);

  const routine = useMemo<RoutineType>(() => ({
    id: editing?.id || uuid(),
    name: routineName || 'Routine name',
    user_id,
    est_duration: Number(duration || 1),
    intensity,
    type: 'Routine',
    favourited,
    tags: tags.size ? Array.from(tags) : null,
    notes: null,
    prev_notes: null,
    exercises,
  }), [duration, editing?.id, exercises, favourited, intensity, routineName, tags, user_id]);

  // Scheduled
  const [addScheduled] = useAddScheduleMutation();
  const [deleteScheduled] = useDeleteScheduleMutation();
  
  // Routine
  const [addNewRoutine] = useAddNewRoutineMutation();
  const [editRoutine] = useEditRoutineMutation();
  const [deleteRoutine] = useDeleteRoutineMutation();

  // Exercises belonging to routine
  const [addNewRoutineExercise] = useAddRoutineExerciseMutation();
  const [deleteRoutineExercise] = useDeleteRoutineExerciseMutation();

  // Routine Data
  const [editRoutineData] = useEditRoutineDataMutation();

  // Add / removal of routine's exercise in edit mode, queues fetches to be made when saving (posts / deletes)
  const routineExerciseDeltas = useMemo<Map<string, DB_RoutineExercise | string>>(() => new Map(), []);  
  
  const onSaveRoutine = useCallback(() => {
    const edit = async () => {
      try {
        await editRoutine(routine).unwrap();
        await Promise.all(Array.from(routineExerciseDeltas, ([_, value]) => value)
          .map(d => {
            if (typeof d === 'string') {
              return deleteRoutineExercise(d).unwrap();
            } else return addNewRoutineExercise(d).unwrap();
          }))
        await Promise.all(Array.from(prevState).map(async ([day, val]) => {
          let capitalized = [day[0].toUpperCase(), day.slice(1)].join('');

          let current = days.has(capitalized);

          // Return if there is no diff
          if (!!current === !!val) return Promise.resolve(); 

          else {
            // Delete the existing schedule
            if (!current && val) {
              return await deleteScheduled(val.id);
            } 
            // Add a new schedule
            else {
              return await addScheduled({
                day,
                id: uuid(),
                routine_id: routine.id,
                user_id
              })
            }
          }
        }));
          
        navigate('/home/routines', { state: {}});
        routineExerciseDeltas.clear();
      } catch(e) {
        console.log(e);
      }
    }
    
    const add = async () => {
      const added: string[] = [];
      try {
        await addNewRoutine(routine).unwrap();
        await Promise.allSettled(routine.exercises
          .map((e) => addNewRoutineExercise({
            id: uuid(),
            routine_id: routine.id,
            user_id,
            exercise_id: e.exercise.id,
            position: e.position,
          }).unwrap()))
          .then(results => results.forEach(r => {
            if (r.status === 'fulfilled') added.push((r.value as DB_RoutineExercise).id)
            else throw new Error('An exercise was not added');
          }))
        await Promise.all(Array.from(days).map(async (day) => await addScheduled({
          day,
          id: uuid(),
          routine_id: routine.id,
          user_id,
        })));

        navigate('/home/routines', { state: { name: routineName || 'Routine Name' }})
      } catch(e) {
        console.log(e);

        // Clean up existing relations / routine
        if (added.length) {
          await Promise.all(added.map(async id => await deleteRoutineExercise(id).unwrap()));
        }
        // Delete routine if exists
        try { await deleteRoutine(routine.id);
        } catch(_) {} // 404 no routine exists
      }
    }

    editing ? edit() : add();
  }, [addNewRoutine, addNewRoutineExercise, addScheduled, days, deleteRoutine, deleteRoutineExercise, editRoutine, editing, navigate, prevState, routine, routineExerciseDeltas, routineName, user_id]);


  // On add exercises
  const onSaveSelection = useCallback((exercises: ExerciseType[]) => {
    const routineExercises = exercises.map((e): RoutineExercise => ({
      id: uuid(),
      exercise: e,
      exercise_id: e.id,
      position: 0,
      routine_id: routine.id,
      user_id,
    }));

    setExercises(p => [...p, ...routineExercises].map((e, i) => ({...e, position: i})));
    routineExercises.forEach(e => routineExerciseDeltas.set(e.id, [{...e}].map(e => ({...e, exercise: undefined}))[0]))
    setSelectExerciseOpen(false);
  }, [routineExerciseDeltas, routine.id, user_id]);

  // On remove exercise
  const onRemoveExercise = useCallback((rtex: RoutineExercise) => {
    if (routineExerciseDeltas.has(rtex.id)) {
      routineExerciseDeltas.delete(rtex.id)
    }
    else {
      routineExerciseDeltas.set(rtex.id, rtex.id)
    }

    const index = exercises.findIndex(e => e.id === rtex.id);
    setExercises(p => 
      [...p.slice(0, index), ...p.slice(index + 1)].map((e, i) => ({ ...e, position: i }))
    );
  }, [exercises, routineExerciseDeltas]);

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
    setSelectExerciseOpen(true);
  }, []);
  

  const onRemoveRoutine = useCallback(() => {
    const remove = async () => {
      const performed = routineData.filter(d => d.routine_id === routine.id);
      try {
        if (performed.length) {
          await Promise.all(performed.map(async (p) => {
            await editRoutineData({...p, routine_id: null}).unwrap();
          }))
        }
        await deleteRoutine(routine.id).unwrap();
        navigate('/home/routines');
      } catch(e) {
        console.log(e)
      }
    }

    remove();
  }, [deleteRoutine, editRoutineData, navigate, routine.id, routineData]);

  return (
    <div className='AddRoutine'>
      <h2>{editing ? 'Edit' : 'Add a new workout'} routine</h2>
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
          <div className='AddRoutine-favourite favourite' onClick={() => setFavourited(p => !p)}>
            {favourited ? <IoIosFlash size={20}/> : <IoIosFlashOff size={20} style={{color: 'grey'}} />}
          </div>
        </div>

        <div className='AddRoutine-duration'>
          <Input value={duration}
            placeholder='Approximate duration' 
            onChange={(e) => {
              if (!e.target.value.length) return setDuration('');
              if (e.target.value.split('').some(n => isNaN(Number(n)))) return;
              const num = Number(e.target.value);
              setDuration('' + Math.max(Math.min(num, 999), 1));
            }}
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
            <div key={e.id} className='AddRoutine-exercise'>
              <Exercise exercise={e.exercise} />
              <div className='AddRoutine-exercise-remove' onClick={() => onRemoveExercise(e)}>
                <IoTrash />
              </div>
            </div>
            )}
          <div className='AddRoutine-add-exercise'>
            <AiOutlinePlus size={19} style={{opacity: 0.3}}/>
            <p onClick={onSelectExercises}>Select exercises</p>
          </div>
        </div>
        
        <LoginButton style={{margin: '5px auto'}} onClick={() => setEditScheduled(true)} className='AddExercise-goal' text='Select Training Days'></LoginButton>

        <div className='AddRoutine-save'>
          <PrimaryButton icon={AiOutlineCheckCircle} disabled={!routine.exercises.length} style={{minWidth: 0}} text='Save' onClick={onSaveRoutine} />
          {editing &&             
          <div className='AddRoutine-remove' onClick={onRemoveRoutine}>
            <AiOutlineDelete size={22} />
            <p style={{marginTop: 5}}>Delete Routine</p>
          </div>
        }
        </div>    
      </form>
      
      <Modal open={editScheduled} onClose={() => setEditScheduled(false)} closeText='Close'>
        <Modal.Header>Schedule this Routine</Modal.Header>
        <div className='AddExercise-select'>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            .map(day => 
              <LoginButton key={day} 
                className='AddExercise-option' 
                text={day} 
                style={{opacity: days.has(day) ? 1 : 0.5}} 
                onClick={() => setDays(p => {
                  const dup = new Set(p);

                  if (dup.has(day)) {
                    dup.delete(day);
                  } else {
                    dup.add(day);
                  }
                  
                  
                  return dup;
                })} 
              />
            )
          }
        </div>
      </Modal>
      
      <Modal closeText='Cancel'
        open={selectExerciseOpen} 
        onClose={() => setSelectExerciseOpen(false)} 
      >
        <Modal.Header>Select Exercises</Modal.Header>
        <div className='AddRoutine-search'>
          <Search tab='Exercises' onSaveSelect={onSaveSelection} />
        </div>
      </Modal> 

    </div>
  )
}