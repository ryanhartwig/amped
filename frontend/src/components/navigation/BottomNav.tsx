import './BottomNav.css';

import { ReactIconButton } from '../ui/ReactIconButton';

/* React Icons */
import { BiDumbbell, BiNotepad } from 'react-icons/bi';
import { IoIosFlash } from 'react-icons/io';
import { BsCalendarCheck } from 'react-icons/bs';
import { RxAvatar } from 'react-icons/rx';

// interface BottomNavProps {

// }

export const BottomNav = () => {



  return (
    <div className='BottomNav'>
      <ReactIconButton text="Dash" buttonSize='55px'>
        <BiNotepad size={25}/>
      </ReactIconButton>
      <ReactIconButton text="Routines" buttonSize='55px'>
        <BiDumbbell size={25}/>
      </ReactIconButton>
      <ReactIconButton text="Train" buttonSize='55px' fontSize='13px'>
        <IoIosFlash size={26}/>
      </ReactIconButton>
      <ReactIconButton text="Finished" buttonSize='55px'>
        <BsCalendarCheck size={25}/>
      </ReactIconButton>
      <ReactIconButton text="Profile" buttonSize='55px'>
        <RxAvatar size={25}/>
      </ReactIconButton>
    </div>
  )
}