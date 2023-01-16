import { useCallback } from 'react';
import './Login.css';

// interface LoginProps {

// }

export const Login = () => {


  const onAuth = useCallback(() => {
    
  }, []);

  
  return (
    <div className='Login'>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={onAuth}>Login with facebook</button>
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
    </div>
  )
}