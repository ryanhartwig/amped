import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from '../../components/search/Search';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { useAppSelector } from '../../utility/hooks';
import './Routines.css';

// interface RoutinesProps {

// }

type Tab = 'Routines' | 'Exercises';
const tabs: Tab[] = ['Routines', 'Exercises'];

export const Routines = () => {
  const navigate = useNavigate();
  const {background_alt: background} = useAppSelector(s => s.theme);

  const [tab, setTab] = useState<'Routines' | 'Exercises'>('Routines');

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
        <Search tab={tab} />
      </div>
        

      {/* "Add new ..." component */}
      <div className='Routines-add'>
        <PrimaryButton 
          onClick={() => navigate(tab === 'Routines' ? '/home/routines/add-rt' : '/home/routines/add-ex')} 
          text={`Add a New ${tab.slice(0, -1)}`} />
      </div>
    </div>
  )
}