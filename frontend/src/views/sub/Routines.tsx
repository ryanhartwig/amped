import { useState } from 'react';
import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from '../../components/search/Search';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { ExerciseType } from '../../types/ExerciseType';
import { RoutineType } from '../../types/RoutineType';
import { useAppSelector } from '../../utility/hooks';
import './Routines.css';

// interface RoutinesProps {

// }

type Tab = 'Routines' | 'Exercises';
const tabs: Tab[] = ['Routines', 'Exercises'];

export const Routines = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const {background_alt: background} = useAppSelector(s => s.theme);

  const [tab, setTab] = useState<'Routines' | 'Exercises'>(location.state?.tag || 'Routines');
  const [edit, setEdit] = useState<RoutineType | ExerciseType>();

  return (
    <div className='Routines'>
      {/* Tabs navigation */}
      <div className='Routines-tabs-wrapper'>
        {tabs.map((t) => 
          <div className='Routines-tab' 
            key={t}
            style={{background: t === tab ? background : ''}}
            onClick={() => setTab(t)}
          >
            <h2>{t}</h2>
          </div>)}
      </div>

      {/* Search component */}
      <div className='Routines-search'>
        <Search tab={tab} setEdit={setEdit} edit={edit} />
      </div>
        

      {/* "Add new ..." component */}
      <div className='Routines-actions'>
        {edit 
          ? <PrimaryButton onClick={() => navigate(tab === 'Routines' ? '/home/routines/add-rt' : '/home/routines/add-ex', { state: { edit }})} 
              text={`Edit ${tab.slice(0, -1)}`}
              icon={AiOutlineEdit}
              className="Routines-edit"
          />
          : <PrimaryButton onClick={() => navigate(tab === 'Routines' ? '/home/routines/add-rt' : '/home/routines/add-ex')} 
              text={`Add a New ${tab.slice(0, -1)}`} 
              icon={AiOutlinePlus}
          />}
        
      </div>
    </div>
  )
}