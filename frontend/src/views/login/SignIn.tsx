import './SignIn.css'

import { useCallback, useState } from "react";
import { Input } from "../../components/ui/Input"
import { useNavigate } from 'react-router-dom';
import { useSignInLocalMutation } from '../../api/injections/user/authSlice';
import { LoginButton } from '../../components/ui/LoginButton';

import { ReactComponent as Facebook } from '../../assets/brand_logos/facebook.svg';
import { ReactComponent as Google } from '../../assets/brand_logos/google.svg';
import { ReactComponent as Twitter } from '../../assets/brand_logos/twitter.svg';
import { HrText } from '../../components/ui/HrText';

export const SignIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [signIn] = useSignInLocalMutation();

  const onSignIn = useCallback(() => {
    ;(async () => {
      try {
        await signIn({username, password}).unwrap();
        navigate('/home/dash');
      } catch(e) {
        console.log('rejected: ', e);
      }
    })()
  }, [navigate, password, signIn, username]);


  return (
    <>
      <div className='SignIn-oauth'>

        <LoginButton 
          onClick={() => window.location.href='http://localhost:8000/api/login/federated/facebook'}
          text='Login with Facebook'
        ><Facebook style={{width: 25, height: 25}} /></LoginButton>
        <LoginButton 
          onClick={() => window.location.href='http://localhost:8000/api/login/federated/google'}
          text='Login with Google'
        ><Google style={{width: 25, height: 25}} /></LoginButton>
        <LoginButton 
          onClick={() => window.location.href='http://localhost:8000/api/login/federated/twitter'}
          text='Login with Twitter'
        ><Twitter style={{width: 25, height: 25}} /></LoginButton>
      </div>
      <div className='SignIn-local'>
        <HrText text="or log in" 
          style={{width: '75%', margin: '14px auto 10px auto'}}
          background={'black'} 
          textFontSize={15}
          textBottomOffset={3}
        />
        <Input className='SignIn-input' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input className='SignIn-input' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
        <LoginButton 
          onClick={onSignIn}
          style={{marginTop: 6}}
          disabled={!username || !password}
          text='Login'
        ></LoginButton>
        <p className="SignIn-forgot" onClick={() => navigate('/login/new')}>Forgot password</p>
        <HrText
          style={{width: '75%', margin: '5px auto 4px auto'}}
          textFontSize={17}
          textBottomOffset={2}
        />

      </div>
      
      <p className="SignIn-create" onClick={() => navigate('/login/new')}>Create an account</p>
    </>
  )
}