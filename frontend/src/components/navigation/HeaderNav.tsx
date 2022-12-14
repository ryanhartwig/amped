import './HeaderNav.css';

import { Logo } from '../ui/Logo';

/* React Icons */
import { FiSettings } from 'react-icons/fi';
import { IoIosNotificationsOutline } from 'react-icons/io'
import { ReactIconButton } from '../ui/ReactIconButton';
import { useAppSelector } from '../../utility/hooks';

// interface HeaderNavProps {

// }

export const HeaderNav = () => {

  const { foreground: background } = useAppSelector(s => s.theme);

  return (
    <div className='HeaderNav' style={{background}}>
      <div className='HeaderNav-items'>
        {/* Left side */}
        <Logo />

        {/* Right side elements */}
        <div className='HeaderNav-buttons'>
          <ReactIconButton buttonSize='45px'>
            <IoIosNotificationsOutline size={32}/>
          </ReactIconButton>
          <ReactIconButton buttonSize='45px'>
            <FiSettings size={25}/>
          </ReactIconButton>
        </div>
      </div>
    </div>
  )
}