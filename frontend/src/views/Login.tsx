import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/userSlice';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* <button onClick={onAuth}>Login with facebook</button> */}
      <a href='http://localhost:8000/api/login/federated/facebook' >loign with facebook</a>
      <br></br>
      <br></br>
    <br></br>
      <br></br>
      <a href='http://localhost:8000/api/login/federated/google' >loign with googlwe</a>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <a href='http://localhost:8000/api/login/federated/twitter' >loign with tweeter</a>
      <br></br>
      <br></br>
      <br></br>

    </div>
  )
}