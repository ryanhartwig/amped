import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../utility/helpers/hooks';
import './GetAuth.css';

export const GetAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sessionData = useAppSelector(s => s.session.sessionStartDate);

  useEffect(() => {
    if (location.pathname === '/') navigate('/login');
    if (location.pathname === '/session' && !sessionData) navigate('/home/train');
  }, [location.pathname, navigate, sessionData]);

  return (
    <div className='GetAuth'>
      {location.pathname === '/session'
        ? sessionData && <Outlet />
        : <Outlet />}
    </div>
  )
}