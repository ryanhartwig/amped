import './BottomNav.css';

import { ReactIconButton } from '../ui/ReactIconButton';

import type { Location } from '../../utility/helpers/hooks/useView';

/* React Icons */
import { BiDumbbell, BiNotepad } from 'react-icons/bi';
import { IoIosFlash } from 'react-icons/io';
import { BsCalendarCheck } from 'react-icons/bs';
import { RxAvatar } from 'react-icons/rx';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../utility/helpers/hooks';
import { useView } from '../../utility/helpers/hooks/useView';

// interface BottomNavProps {

// }


export const BottomNav = () => {
  const navigate = useNavigate();

  const { foreground: background } = useAppSelector(s => s.theme);
  const { route } = useView();
  
  
  const onClick = useCallback((route: Location) => {
    navigate(`/home/${route}`);
  }, [navigate]);

  return (
    <div className='BottomNav' style={{background}}>
      <div className='BottomNav-items'>
        {/* Dashboard View */}
        <ReactIconButton 
          text="Dash" 
          buttonSize='55px' 
          active={route === 'dash'}
          onClick={() => onClick('dash')}
        >
          <BiNotepad size={25}/>
        </ReactIconButton>

        {/* Routines View */}
        <ReactIconButton 
          text="Routines" 
          buttonSize='55px' 
          active={route === 'routines'}
          onClick={() => onClick('routines')}
        >
          <BiDumbbell size={30}/>
        </ReactIconButton>

        {/* Train View */}
        <ReactIconButton 
          text="Train" 
          buttonSize='55px' fontSize='13px' 
          active={route === 'train'}
          onClick={() => onClick('train')}
        >
          <IoIosFlash size={30}/>
        </ReactIconButton>

        {/* Finished Routines View */}
        <ReactIconButton 
          text="Finished" 
          buttonSize='55px' 
          active={route === 'finished'}
          onClick={() => onClick('finished')}
        >
          <BsCalendarCheck size={21}/>
        </ReactIconButton>

        {/* Profile View */}
        <ReactIconButton 
          text="Profile" 
          buttonSize='55px' 
          active={route === 'profile'}
          onClick={() => onClick('profile')}
        >
          <RxAvatar size={26}/>
        </ReactIconButton>
      </div>
    </div>
  )
}