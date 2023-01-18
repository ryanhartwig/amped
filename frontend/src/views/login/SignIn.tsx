import './SignIn.css'

import { useCallback, useState } from "react";
import { Input } from "../../components/ui/Input"
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { useSignInLocalMutation } from '../../api/injections/user/authSlice';

export const SignIn = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [signIn] = useSignInLocalMutation();

  const onSignIn = useCallback(() => {
    console.log('fe');
    ;(async () => {
      // const response = await fetch('http://localhost:8000/api/login/local', {
      //   method: 'POST',
      //   credentials: 'include',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     username,
      //     password
      //   })
      // })

      try {
        const data = await signIn({username, password}).unwrap();
        console.log('responded with ', data);
      } catch(e) {
        console.log('rejected: ', e);
      }

      const user = await fetch('http://localhost:8000/api/currentuser', {
        credentials: 'include',
      })

      if (user.ok) {
        navigate('/home/dash');
      }

    })()
  }, [navigate, password, signIn, username]);

  return (
    <>
      <div className='Login-oauth'>
        <a href='http://localhost:8000/api/login/federated/facebook' >loign with facebook</a>
        <a href='http://localhost:8000/api/login/federated/google' >loign with googlwe</a>
        <a href='http://localhost:8000/api/login/federated/twitter' >loign with tweeter</a>
      </div>
      <div>
        <p>login</p>
        <Input placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
        <PrimaryButton onClick={onSignIn} text='Sign in' disabled={!username || !password} style={{marginTop: 12}} />
      </div>
      <p className="Login-create" onClick={() => navigate('/login/new')}>Create an account</p>
    </>
  )
}