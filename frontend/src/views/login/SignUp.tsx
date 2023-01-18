import './SignUp.css';
import { Input } from "../../components/ui/Input"
import { useCallback, useMemo, useState } from 'react';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { useCreateNewUserMutation, useDeleteUserMutation } from '../../api/injections/user/userSlice';
import { useAddCredentialsMutation } from '../../api/injections/user/authSlice';

export const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [p1, setP1] = useState<string>('');
  const [p2, setP2] = useState<string>('');
  const [unique, setUnique] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);

  // Input validation
  const nameValid = useMemo(() => name.length >= 5 && name.length < 15, [name]);
  const p1Valid = useMemo(() => {
    const split = p1.split('');

    return p1.length >= 6 
    && p1.length <= 30 
    && split.some(c => isNaN(Number(c)) && c.toUpperCase() === c.toLowerCase()) // has non-alphanumeric characters
    && split.some(c => c.toUpperCase() !== c.toLowerCase() && c === c.toUpperCase()) // has uppercase letter
    && split.some(c => c.toUpperCase() !== c.toLowerCase() && c === c.toLowerCase()) // has lowercase letter    
  }, [p1]);
  const p2Valid = useMemo(() => p1 === p2, [p1, p2]);
  const allValid = useMemo(() => nameValid && p1Valid && p2Valid && unique, [nameValid, p1Valid, p2Valid, unique]);

  const onVerifyUsername = useCallback((e: any) => {
    if (!nameValid) return;

    ;(async() => {
      const response = await fetch(`http://localhost:8000/api/credentials/unique/${name}`);
      const data = await response.json();

      setUnique(!data);
    })()
  }, [name, nameValid]);

  const [createUser] = useCreateNewUserMutation();
  const [addCredentials] = useAddCredentialsMutation();
  const [deleteUser] = useDeleteUserMutation();

  const onSignUp = useCallback(() => {
    ;(async () => {
      setInputsDisabled(true);

      const id = uuid();
      let createdUser = false;
      try {
        const user = await createUser({id, name, email: '', weekly_target: 0}).unwrap();
        createdUser = true;
        await addCredentials({ password: p1, user_id: user.id, username: name }).unwrap();

        navigate('/login');

      } catch(e) {
        console.log(e);
        if (createdUser) await deleteUser(id);
        setInputsDisabled(false);
      }
    })()
  }, [addCredentials, createUser, deleteUser, name, navigate, p1]);

  return (
    <>
      <p>Welcome to amped!</p>
      <div className="SignUp-creds">
        <Input disabled={inputsDisabled} placeholder='username' onBlur={onVerifyUsername} onChange={(e) => setName(e.target.value)}/>
        <Input disabled={inputsDisabled} placeholder='password' type='password' onChange={(e) => setP1(e.target.value)}/>
        <Input disabled={inputsDisabled} placeholder='confirm password' type='password' onChange={(e) => setP2(e.target.value)}/>
      </div>
      <PrimaryButton onClick={onSignUp} icon={'logo'} altColor disabled={!allValid} text='Sign up' />
      <p className="Login-create" onClick={() => navigate('/login')}>back</p>
    </>
  )
}