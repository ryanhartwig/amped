import './HeaderNav.css';

/* React Icons */
import { FiLogOut } from 'react-icons/fi';

import { useAppSelector } from '../../utility/helpers/hooks';
import { ReactIconButton } from '../ui/ReactIconButton';
import { Logo } from '../ui/Logo';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const HeaderNav = () => {
  const navigate = useNavigate();
  const { foreground: background } = useAppSelector(s => s.theme);

  const onLogout = useCallback(() => {
    ;(async () => {
      const res = await fetch('http://localhost:8000/api/currentuser/logout', {
        credentials: 'include',
      });

      if (res.ok) {
        navigate('/login');
      }
    })()
  }, [navigate]);

  return (
    <div className='HeaderNav' style={{background}}>
      <div className='HeaderNav-items'>
        {/* Left side */}
        <Logo />

        {/* Right side elements */}
        <div className='HeaderNav-buttons'>
          <ReactIconButton buttonSize='40px' onClick={onLogout}>
            <FiLogOut size={20}/>
          </ReactIconButton>
          {/* <ReactIconButton buttonSize='45px'>
            <FiSettings size={19}/>
          </ReactIconButton> */}
        </div>
      </div>
    </div>
  )
}