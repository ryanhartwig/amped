import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../utility/helpers/hooks';
import './GetAuth.css';

export const GetAuth = () => {
  const navigate = useNavigate();

  const authenticated = useAppSelector(s => s.user.authenticated);
  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    }
  }, [authenticated, navigate]);


  return (
    <div className='GetAuth'>
      <Outlet />
    </div>
  )
}