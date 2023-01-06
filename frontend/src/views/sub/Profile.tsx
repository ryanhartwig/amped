import './Profile.css';

/* React Icons */
import { IoPersonOutline } from 'react-icons/io5';
import { BsCalendar } from 'react-icons/bs';

import { useAppSelector } from '../../utility/helpers/hooks';
import { WeeklyTarget } from '../../components/stats/WeeklyTarget';
import { useCallback, useMemo, useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { useDispatch } from 'react-redux';
import { addEditGoal } from '../../store/slices/userSlice';
import { Goal } from '../../types/Goal';
import uuid from 'react-uuid';

export const Profile = () => {
  const dispatch = useDispatch();
  
  const { background_alt: background } = useAppSelector(s => s.theme);

  const [weeks] = useState<number>(2);
  const [goalModal, setGoalModal] = useState<boolean>(false);
  
  // Input values
  const [goalInput, setGoalInput] = useState<string>('');
  const [dateValue, setDateValue] = useState<string>('');

  const [year, month, day] = useMemo<number[]>(() => dateValue.split('-').map(n => Number(n)), [dateValue]);
  const selectedDate = useMemo<Date>(() => new Date(year, month - 1, day), [day, month, year]);
  const valid = useMemo(() => selectedDate.getTime() >= new Date().getTime() && goalInput.length, [goalInput.length, selectedDate]);

  const goal: Goal = useMemo<Goal>(() => ({
    completed: false,
    deadline: selectedDate.getTime(),
    goal: goalInput,
    id: uuid()
  }), [goalInput, selectedDate]);

  const onSaveGoal = useCallback(() => {
    dispatch(addEditGoal(goal))
  }, [dispatch, goal]);

  return (
    <div className='Profile'>
      {/* Top Section (avatar & name) */}
      <div className='Profile-avatar' style={{background}}>
        <div className='Profile-circle'>
          <IoPersonOutline size={67} className='Profile-avatar-svg' />
        </div>
      </div>
      <h2>Ryan Hartwig</h2>
      <hr className='Profile-hr' />


      {/* Weekly target */}
      <div className='Profile-weekly-target'>
        <p>Weekly training target</p>
        <WeeklyTarget className='Profile-weekly-target-days' />
        <h2 style={{fontSize: 26, marginBottom: 6}}>{weeks} weeks</h2>
        <p style={{fontSize: '0.9em', fontWeight: 100}}>target reached</p>
      </div>

      {/* Training Goals / Milestones */}
      <div className='Profile-goals'>
        <p>My training goals</p>
        <div className='Profile-goals-wrapper hidescrollbar' style={{background}}>
          <p className='Profile-goals-add' onClick={() => setGoalModal(true)}>+ Add training goal</p> 
        </div>
        
        {/* Add goal modal */}
        <Modal open={goalModal} onClose={() => setGoalModal(false)} closeText='Cancel'>
          <Modal.Header>Add a training goal</Modal.Header>
          <div className='Profile-goals-content'>
            <div className='Profile-goals-inputs'>
              <label htmlFor='PRF-goal'><p className='PRF-label'>Goal label</p></label>
              <Input id='PRF-goal' 
                placeholder='eg. 200lb 1RM (bench press)' 
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
              />

              <label htmlFor='PRF-date'><p className='PRF-label'>Goal deadline</p></label>
              <Input type={'date'} 
                id='PRF-date'
                onChange={(e) => setDateValue(e.target.value)}
                value={dateValue}
                icon={
                  <div className='Profile-goals-icon'>
                    <BsCalendar className='Profile-goals-calendar' size={18} />
                  </div>
                } 
              />

            </div>
            <PrimaryButton text='Save Goal' 
              icon={'logo'} 
              disabled={!valid} 
              onClick={onSaveGoal}
            />
            <div className='Profile-goals-errors'>
              {!goalInput.length && <p>Enter a training goal</p>}
              {(!dateValue || selectedDate.getTime() < new Date().getTime()) && <p>Enter a date greater than today</p>}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}