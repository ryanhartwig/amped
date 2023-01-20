import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './GetAuth.css';

export const GetAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') navigate('/login');
  }, [location.pathname, navigate]);

  return (
    <div className='GetAuth'>
      <Outlet />
    </div>
  )
}