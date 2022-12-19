import './AddRoutine.css';

import { useCallback, useState } from 'react';

/* React icons */
import { IoReturnDownBackSharp } from 'react-icons/io5';
import { Input } from '../../components/ui/Input';

export const AddRoutine = () => {
  const [routineName, setRoutineName] = useState<string>('');
  const [tag, setTag] = useState<string>('');

  const onSaveRoutine = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  const onAddTag = useCallback(() => {
    console.log(tag);
  }, [tag]);
  
  return (
    <div className='AddRoutine'>
      <h2>Add a new workout routine</h2>
      <hr></hr>
      
      <form className='AddRoutine-form' onSubmit={onSaveRoutine}>
        <Input onChange={({target}) => setRoutineName(target.value)} 
          value={routineName}
          placeholder="Routine name" 
        />

        <div className='AddRoutine-addtag-wrapper'>
          <Input style={{paddingRight: 80}} 
            onChange={({target}) => setTag(target.value)} 
            value={tag} 
            mini
            onEnter={onAddTag}
            placeholder="Add tags (push, pull ... )"/>
          {!!tag.length && <div className='AddRoutine-enter'>
            <IoReturnDownBackSharp size={26} style={{color: 'grey'}}/>
            <p>add</p>
          </div>}
        </div>
      </form>
    </div>
  )
}