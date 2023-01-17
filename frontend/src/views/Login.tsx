import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { setUser } from '../store/slices/userSlice';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/currentuser', { credentials: 'include'});
        const data = await res.json();
        
        if (!data?.id) return;
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
        <div className='Login-oauth'>
          <a href='http://localhost:8000/api/login/federated/facebook' >loign with facebook</a>
          <a href='http://localhost:8000/api/login/federated/google' >loign with googlwe</a>
          <a href='http://localhost:8000/api/login/federated/twitter' >loign with tweeter</a>
        </div>
        <div>
          <p>login</p>
          <Input placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
        </div>
        <a href='http://localhost:3000/login/new'>create account</a>
      </div>
    </div>
  )
}