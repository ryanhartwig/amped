import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// interface LoginProps {

// }

export const Login = () => {
  const navigate = useNavigate();

  const onAuth = useCallback(() => {
    navigate('http://localhost:8000/api/login/federated/facebook');
  }, [navigate]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/currentuser', { credentials: 'include'});
        const json = await res.json();
        console.log(json);
      } catch(e) {
        console.log(e);
      }
    }

    getUser();
  }, []);

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
      <button>Login with google</button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <button>Login with twitter</button>
      <br></br>
      <br></br>
      <br></br>

      <button onClick={() => fetch('http://localhost:8000/api/currentuser/logout', {
        method: 'POST',
      })}>logout</button>

    </div>
  )
}