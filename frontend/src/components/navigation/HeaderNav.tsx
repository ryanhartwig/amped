import './HeaderNav.css';

import { Logo } from '../ui/Logo';

/* React Icons */
import { FiSettings } from 'react-icons/fi';
import { IoIosNotificationsOutline } from 'react-icons/io'
import { ReactIconButton } from '../ui/ReactIconButton';

// interface HeaderNavProps {

// }

export const HeaderNav = () => {



  return (
    <div className='HeaderNav'>
      {/* Left side */}
      <Logo />

      {/* Right side elements */}
      <div className='header-nav-buttons'>
        <ReactIconButton>
          <IoIosNotificationsOutline size={32}/>
        </ReactIconButton>
        <ReactIconButton>
          <FiSettings size={25}/>
        </ReactIconButton>
      </div>
    </div>
  )
}