import { useState, useMemo, useEffect } from 'react';
import { BiTrash } from 'react-icons/bi';
import { BsCalendar } from 'react-icons/bs';
import uuid from 'react-uuid';
import { GoalType } from '../../types/Goal';
import { zeroTime } from '../../utility/helpers/zeroTime';
import { Checkbox } from '../ui/Checkbox';
import { Input } from '../ui/Input';
import { PrimaryButton } from '../ui/PrimaryButton';
import './AddEditGoal.css';

interface AddEditGoalProps {
  onSave: (goal: GoalType) => any,
  onDelete: (id: string) => any,
  existingGoal?: GoalType,
}

const getDateInputFromDate = (d: Date) => {
  return `${d.getFullYear()}-${zeroTime(d.getMonth() + 1)}-${zeroTime(d.getDate())}`;
}

export const AddEditGoal = ({onSave, onDelete, existingGoal: e}: AddEditGoalProps) => {
  const existingDateString = e ? getDateInputFromDate(new Date(e.deadline)) : undefined;

  // Input values
  const [goalInput, setGoalInput] = useState<string>(e?.goal || '');
  const [dateValue, setDateValue] = useState<string>(existingDateString || '');
  const [id] = useState<string>(e?.id || uuid());
  const [completed, setCompleted] = useState<boolean>(e?.completed ?? false);

  const [year, month, day] = useMemo<number[]>(() => dateValue.split('-').map(n => Number(n)), [dateValue]);
  const selectedDate = useMemo<Date>(() => new Date(year, month - 1, day), [day, month, year]);
  const valid = useMemo(() => selectedDate.getTime() >= new Date().getTime() && goalInput.length, [goalInput.length, selectedDate]);

  const goal: GoalType = useMemo<GoalType>(() => ({
    completed,
    deadline: selectedDate.getTime(),
    goal: goalInput,
    id,
  }), [completed, goalInput, id, selectedDate]);

  useEffect(() => {
    console.log(dateValue)
  }, [dateValue]);

  return (
    <div className='AddEditGoal'>
      <div className='AddEditGoal-inputs'>
        <label htmlFor='AEG-goal'><p className='AEG-label'>Goal label</p></label>
        <Input id='AEG-goal' 
          placeholder='eg. 200lb 1RM (bench press)' 
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
        />

        <label htmlFor='AEG-date'><p className='AEG-label'>Goal deadline</p></label>
        <Input type={'date'} 
          id='AEG-date'
          onChange={(e) => setDateValue(e.target.value)}
          value={dateValue}
          placeholder={dateValue}
          icon={
            <div className='AddEditGoal-icon'>
              <BsCalendar className='AddEditGoal-calendar' size={18} />
            </div>
          } 
        />

        <Checkbox checked={completed} 
          onClick={() => setCompleted(p => !p)} 
          label='Completed' 
          style={{marginTop: 25, marginLeft: 10}}
        />
      </div>
      <PrimaryButton text={e ? 'Save changes' : 'Save goal'}
        icon={'logo'} 
        disabled={!valid} 
        onClick={() => onSave(goal)}
      />
      {e && 
      <PrimaryButton text='Delete goal' 
        icon={BiTrash} 
        style={{background: '#6F2323', width: '70%', minWidth: 0, height: 40, marginTop: 15, marginBottom: 30}} 
        fontSize={15} 
        onClick={() => onDelete(e.id)}
      /> }
      <div className='AddEditGoal-errors'>
        {!goalInput.length && <p>Enter a training goal</p>}
        {(!dateValue || selectedDate.getTime() < new Date().getTime()) && <p>Enter a date greater than today</p>}
      </div>
    </div>
  )
}