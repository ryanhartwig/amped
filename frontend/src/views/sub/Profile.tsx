import './Profile.css';

/* React Icons */
import { IoPersonOutline } from 'react-icons/io5';

import { useAppSelector } from '../../utility/helpers/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { AddEditGoal } from '../../components/user/AddEditGoal';
import { useDispatch } from 'react-redux';
import { GoalType } from '../../types/GoalType';
import { addEditGoal, DaysTrained, deleteGoal, setWeeklyTarget } from '../../store/slices/userSlice';
import { Goal } from '../../components/user/Goal';
import { Counter } from '../../components/ui/Counter';


const tabs = ['My training goals', 'Completed goals']

export const Profile = () => {
  const dispatch = useDispatch();
  
  const { background_alt: background } = useAppSelector(s => s.theme);
  const goals = [...useAppSelector(s => s.user.goals)]
    .sort((a, b) => 
      a.completed && b.completed 
        ? b.deadline - a.deadline // shows most recently completed first
        : a.deadline - b.deadline // shows closest deadline first
  );

  const [goalModal, setGoalModal] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(0);
  const [selectedGoal, setSelectedGoal] = useState<GoalType>();

  const weeklyTarget = useAppSelector(s => s.user.weekly_target);
  const [target, setTarget] = useState<number>(weeklyTarget);

  useEffect(() => {
    dispatch(setWeeklyTarget(target as DaysTrained))
  }, [dispatch, target]);

  const onSave = useCallback((g: GoalType) => {
    dispatch(addEditGoal(g));
    setGoalModal(false);
    setSelectedGoal(undefined);
  }, [dispatch]);

  const onDelete = useCallback((id: string) => {
    dispatch(deleteGoal(id));
    setSelectedGoal(undefined);
    setGoalModal(false);
  }, [dispatch]);

  return (
    <div className='Profile'>
      {/* Top Section (avatar & name) */}
      <div className='Profile-avatar' style={{background}}>
        <div className='Profile-circle'>
          <IoPersonOutline className='Profile-avatar-svg' />
        </div>
      </div>
      <h2>Ryan Hartwig</h2>
      <hr className='Profile-hr' />


      {/* Weekly target */}
      {/* <div className='Profile-weekly-target'>
        <WeeklyTarget style={{marginBottom: 15}} />
        <h2 style={{fontSize: 26, marginBottom: 6}}>{weeks} weeks</h2>
        <p style={{fontSize: '0.9em', fontWeight: 100}}>target reached</p>
      </div> */}

      {/* Training Goals / Milestones */}
      <div className='Profile-goals'>
        <div style={{height: 'calc(100% - 135px'}}>
          <div className='Profile-goals-tabs'>
            {tabs.map((t, i) => 
            <div className='Profile-goals-tab' 
              onClick={() => setTab(i)} 
              key={t}
              style={{borderBottomColor: i !== tab ? 'transparent' : ''}}
            >
              <p style={{opacity: tab === i ? 1 : 0.5}}>{t}</p>
            </div>
            )}
          </div>
          <div className='Profile-goals-wrapper hidescrollbar' style={{background}}>
            <div className='Profile-goal'>
              {goals.map(g => ((tab === 0 && !g.completed) || (tab === 1 && g.completed)) 
                && <Goal goal={g} 
                    key={g.id} 
                    onClick={() => {
                      setSelectedGoal(g);
                      setGoalModal(true);
                    }}
                  />
              )}
            </div>
            {tab === 0 
              ? <p className='Profile-goals-add' onClick={() => setGoalModal(true)}>+ Add training goal</p> 
              : goals.filter(g => g.completed).length 
                ? <></> 
                : <p style={{
                    textAlign: 'center', 
                    padding: 10, 
                    paddingBottom: 14, 
                    fontSize: 14, 
                    fontWeight: 100
                  }}>No goals to show</p>
            }
          </div>
        </div>
        

        <div style={{background}} className="Profile-target noselect">
          <p>Weekly training goal (days)</p>
          <Counter incrementBy={1} value={target} setValue={setTarget} max={7} min={0} />
        </div>
        
        {/* Add goal modal */}
        <Modal open={goalModal} onClose={() => setGoalModal(false)} closeText='Cancel'>
          <Modal.Header>
            {selectedGoal
              ? 'Edit training goal'
              : 'Add a training goal'}
          </Modal.Header>
          <AddEditGoal onDelete={onDelete} onSave={onSave} existingGoal={selectedGoal} />
        </Modal>
      </div>
    </div>
  )
}