import { useState, useMemo, useCallback } from 'react';
import { BsCalendar } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import { addEditGoal } from '../../store/slices/userSlice';
import { Goal } from '../../types/Goal';
import { Input } from '../ui/Input';
import { PrimaryButton } from '../ui/PrimaryButton';
import './AddEditGoal.css';

interface AddEditGoalProps {
  existingGoal?: Goal,
}

const getDateInputFromDate = (d: Date) => {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export const AddEditGoal = ({existingGoal: e}: AddEditGoalProps) => {
  const dispatch = useDispatch();

  const existingDateString = e ? getDateInputFromDate(new Date(e.deadline)) : undefined;

  // Input values
  const [goalInput, setGoalInput] = useState<string>(e?.goal || '');
  const [dateValue, setDateValue] = useState<string>(existingDateString || '');
  const [id] = useState<string>(e?.id || uuid());
  const [completed] = useState<boolean>(e?.completed ?? false);

  const [year, month, day] = useMemo<number[]>(() => dateValue.split('-').map(n => Number(n)), [dateValue]);
  const selectedDate = useMemo<Date>(() => new Date(year, month - 1, day), [day, month, year]);
  const valid = useMemo(() => selectedDate.getTime() >= new Date().getTime() && goalInput.length, [goalInput.length, selectedDate]);

  const goal: Goal = useMemo<Goal>(() => ({
    completed,
    deadline: selectedDate.getTime(),
    goal: goalInput,
    id,
  }), [completed, goalInput, id, selectedDate]);

  const onSaveGoal = useCallback(() => {
    dispatch(addEditGoal(goal))
  }, [dispatch, goal]);
  
  return (
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
  )
}