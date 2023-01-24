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
import { useGetCurrentUserQuery, useGetUserByIdQuery } from '../api/injections/user/userSlice';
import { useGetRoutineDataQuery } from '../api/injections/data/routineDataSlice';
import { RoutineDataType } from '../types/RoutineDataType';
import { setRoutineData } from '../store/slices/workoutDataSlice';
import { useAppSelector } from '../utility/helpers/hooks';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const route = useView();

  const cancel = ['add-rt', 'add-ex'].some(str => location.pathname.includes(str));
  const { background } = useAppSelector(s => s.theme);

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

  const { data: currentUser, isError, isFetching } = useGetCurrentUserQuery(null);

  const id = useMemo(() => currentUser?.id, [currentUser]);

  const { data: user } = useGetUserByIdQuery(id, { skip: !id });
  const { data: routines = [] } = useGetRoutinesQuery(id, { skip: !id }) as { data: RoutineType[] };
  const { data: exercises = [] } = useGetExercisesQuery(id, { skip: !id }) as { data: ExerciseType[] };
  const { data: relations = [] } = useGetRoutineExercisesQuery(id, { skip: !id }) as { data: DB_RoutineExercise[] };
  const { data: goals = [] } = useGetGoalsQuery(id, { skip: !id }) as { data: GoalType[] };
  const { data: routineData = [] } = useGetRoutineDataQuery(id, { skip: !id }) as { data: RoutineDataType[] };

  useEffect(() => {
    if (!isError || isFetching) return;

    dispatch(setUser());
    // navigate('/login');
  }, [dispatch, isError, isFetching, navigate])

  // Update user state 
  useEffect(() => {
    dispatch(setUser(user))
  }, [dispatch, user]);

  // Initialize goals state
  useEffect(() => {
    dispatch(setGoals(goals));
  }, [dispatch, goals]);
  
  // Initialize routines state
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

  // Initialize exercises state
  useEffect(() => {
    dispatch(setExercises(exercises));
  }, [dispatch, exercises]);

  // Initialize routineData state
  useEffect(() => {
    dispatch(setRoutineData(routineData))
  }, [dispatch, routineData]);

  return (
    <div className='Home' style={{background}}>
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