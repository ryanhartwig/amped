import './Profile.css';

/* React Icons */
import { IoPersonOutline } from 'react-icons/io5';

import { useAppSelector } from '../../utility/helpers/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { AddEditGoal } from '../../components/user/AddEditGoal';
import { GoalType } from '../../types/GoalType';
import { Goal } from '../../components/user/Goal';
import { Counter } from '../../components/ui/Counter';
import { useAddNewGoalMutation, useDeleteGoalMutation, useEditGoalMutation } from '../../api/injections/user/goalsSlice';
import { SecondaryButton } from '../../components/ui/SecondaryButton';
import { useEditUserMutation } from '../../api/injections/user/userSlice';

const tabs = ['My training goals', 'Completed goals']

export const Profile = () => {
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
  const name = useAppSelector(s => s.user.name);
  const [target, setTarget] = useState<number>(weeklyTarget);

  useEffect(() => { setTarget(weeklyTarget)}, [weeklyTarget]);

  const [editUser] = useEditUserMutation();
  const [disabled, setDisabled] = useState<boolean>(false);

  const onSaveWeeklyTarget = useCallback(() => {
    (async () => {
      setDisabled(true);
      await editUser({
        id: 'admin',
        patch: {
          weekly_target: target
        }
      }).unwrap();
      setDisabled(false);
    })()
  }, [editUser, target]);

  const [[addGoal], [updateGoal], [deleteGoal]] = [
    useAddNewGoalMutation(),
    useEditGoalMutation(),
    useDeleteGoalMutation(),
  ]

  const onSave = useCallback((g: GoalType) => {
    (async () => {
      try {
        // update
        if (goals.find(goal => goal.id === g.id)) {
          await updateGoal(g).unwrap();

        // create
        } else {
          await addGoal(g).unwrap();
        }
      } catch(e) {
        console.log(e);
      } finally {
        setGoalModal(false);
        setSelectedGoal(undefined);
      }
    })()
    
  }, [addGoal, updateGoal, goals]);

  const onDelete = useCallback((id: string) => {
    (async () => {
      await deleteGoal(id).unwrap();
      setSelectedGoal(undefined);
      setGoalModal(false);
    })()
  }, [deleteGoal]);

  return (
    <div className='Profile'>
      {/* Top Section (avatar & name) */}
      <div className='Profile-avatar' style={{background}}>
        <div className='Profile-circle'>
          <IoPersonOutline className='Profile-avatar-svg' />
        </div>
      </div>
      <h2>{name}</h2>
      <hr className='Profile-hr' />

      {/* Training Goals / Milestones */}
      <div className='Profile-goals'>
        <div style={{height: weeklyTarget !== target ? 'calc(100% - 165px' : 'calc(100% - 135px'}}>
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
          <div className='Profile-target-counter'>
            <Counter incrementBy={1} value={target} setValue={setTarget} max={7} min={0} />
            {weeklyTarget !== target && 
              <SecondaryButton 
                style={{
                  width: 80, 
                  height: 30, 
                  minWidth: 0, 
                  justifyContent: 'center', 
                  marginTop: 5
                }} 
                disabled={disabled}
                className='Profile-target-save' 
                text='Save' 
                onClick={onSaveWeeklyTarget}
              />}
          </div>
        </div>
        
        {/* Add goal modal */}
        <Modal open={goalModal} onClose={() => {
          setGoalModal(false);
          setSelectedGoal(undefined);
        }} closeText='Cancel'>
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