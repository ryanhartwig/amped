import './Home.css';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/navigation/BottomNav';
import { HeaderNav } from '../components/navigation/HeaderNav';
import { useView } from '../utility/helpers/hooks/useView';

/* React icons */
import { AiOutlineLeft } from 'react-icons/ai';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setExercises, setRoutines } from '../store/slices/workoutsSlice';
import { useGetExercisesQuery } from '../api/injections/workouts/exercisesSlice';
import { useGetRoutinesQuery } from '../api/injections/workouts/routinesSlice';
import { RoutineType } from '../types/RoutineType';
import { DB_RoutineExercise, useGetRoutineExercisesQuery } from '../api/injections/workouts/relationsSlice';
import { ExerciseType } from '../types/ExerciseType';
import { useGetGoalsQuery } from '../api/injections/user/goalsSlice';
import { GoalType } from '../types/GoalType';
import { setGoals, setUser } from '../store/slices/userSlice';
import { useGetUserQuery } from '../api/injections/user/userSlice';


export const Home = () => {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const location = useLocation();
  const cancel = ['add-rt', 'add-ex'].some(str => location.pathname.includes(str));

  const route = useView();

  const back = useMemo(() => {
    return !['dash', 'routines', 'train', 'finished', 'profile'].includes(route[route.length - 1]);
  }, [route]);
  
  const onGoBack = useCallback(() => {
    if (cancel) {
      navigate('/home/routines', { state: {}});
    } else {
      navigate(-1);
    }
  }, [cancel, navigate]);

  const { data: userData  } = useGetUserQuery('admin');
  const { data: routines = [] } = useGetRoutinesQuery('admin') as { data: RoutineType[] };
  const { data: exercises = [] } = useGetExercisesQuery('admin') as { data: ExerciseType[] };
  const { data: relations = [] } = useGetRoutineExercisesQuery('admin') as { data: DB_RoutineExercise[] };
  const { data: goals = [] } = useGetGoalsQuery('admin') as { data: GoalType[] };

  // Initialize user state 
  useEffect(() => {
    if (!userData) return;

    dispatch(setUser(userData));
  }, [dispatch, userData]);
  
  // Fill routines store state
  useEffect(() => {
    let updated: RoutineType[] = routines;
    if (relations.length && routines.length && exercises.length) {
      updated = updated.map((r): RoutineType => ({
        ...r,
        exercises: relations.filter(rtex => rtex.routine_id === r.id).map(rtex => ({
          ...rtex,
          exercise: exercises.find(e => e.id === rtex.exercise_id)!,
        }))
      }))
    }
    dispatch(setRoutines(updated));
  }, [dispatch, exercises, relations, routines]);

  // Fill exercises store state
  useEffect(() => {
    dispatch(setExercises(exercises));
  }, [dispatch, exercises]);

  useEffect(() => {
    dispatch(setGoals(goals));
  }, [dispatch, goals]);

  return (
    <div className='Home'>
      {/* Top navigation bar */}
      <HeaderNav />

      {/* All sub-routes / views */}
      <div className='Outlet'>

        {back && <div className='Home-goback noselect' onClick={onGoBack}>
          <AiOutlineLeft size={11} />
          <p>{cancel ? 'Cancel' : 'Back'}</p>
        </div>}

        <div className='Home-app' style={{height: back ? 'calc(100% - 34px)' : ''}}>
          <Outlet />
        </div>
      </div>
      
      {/* Bottom (mobile) navigation bar */}
      {!cancel && <BottomNav />}
    </div>
  )
}