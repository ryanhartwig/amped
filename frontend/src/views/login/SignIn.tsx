import './SignIn.css'

import { useCallback, useState } from "react";
import { Input } from "../../components/ui/Input"
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { useSignInLocalMutation } from '../../api/injections/user/authSlice';
import { LoginButton } from '../../components/ui/LoginButton';

import { ReactComponent as Facebook } from '../../assets/brand_logos/facebook.svg';
import { ReactComponent as Google } from '../../assets/brand_logos/google.svg';
import { ReactComponent as Twitter } from '../../assets/brand_logos/twitter.svg';
import { HrText } from '../../components/ui/HrText';
import { useAppSelector } from '../../utility/helpers/hooks';

export const SignIn = () => {
  const navigate = useNavigate();

  const { background } = useAppSelector(s => s.theme);
  
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
      <HrText text="sign in with" 
        background={background} 
        textFontSize={17}
        textBottomOffset={2}
      />
      <div className='SignIn-oauth'>
        <LoginButton 
          onClick={() => window.location.href='http://localhost:8000/api/login/federated/facebook'}
          text='Login with Facebook'
        ><Facebook style={{width: 30, height: 30}} /></LoginButton>
        <LoginButton 
          onClick={() => window.location.href='http://localhost:8000/api/login/federated/google'}
          text='Login with Google'
        ><Google style={{width: 30, height: 30}} /></LoginButton>
        <LoginButton 
          onClick={() => window.location.href='http://localhost:8000/api/login/federated/twitter'}
          text='Login with Twitter'
        ><Twitter style={{width: 30, height: 30}} /></LoginButton>
      </div>
      <div>
        <p>login</p>
        <Input placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
        <PrimaryButton onClick={onSignIn} text='Sign in' disabled={!username || !password} style={{marginTop: 12}} />
      </div>
      <p className="SignIn-create" onClick={() => navigate('/login/new')}>Create an account</p>
    </>
  )
}