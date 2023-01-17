import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { setUser } from '../../store/slices/userSlice';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/currentuser', { credentials: 'include'});
        if (!res.ok) return;

        const data = await res.json();

        dispatch(setUser({
          id: data.id,
        }));

        navigate('/home/dash');
      } catch(e) {
        console.log(e);
      }
    }

    getUser();
  }, [dispatch, navigate]);

  return (
    <div className='Login'>
      <div className='Login-form'>
        <Outlet />
      </div>
    </div>
  )
}