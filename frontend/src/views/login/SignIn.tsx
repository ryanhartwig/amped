import './SignIn.css'

import { useState } from "react";
import { Input } from "../../components/ui/Input"
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
      </div>
      <p className="Login-create" onClick={() => navigate('/login/new')}>Create an account</p>
    </>
  )
}