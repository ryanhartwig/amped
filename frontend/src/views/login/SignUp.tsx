import './SignUp.css';
import { Input } from "../../components/ui/Input"
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { useCreateNewUserMutation, useDeleteUserMutation } from '../../api/injections/user/userSlice';
import { useAddCredentialsMutation } from '../../api/injections/user/authSlice';

export const Li = ({text, valid}: {text: string, valid: boolean}) => {
  return (
    <>
      {!valid && <li><p>{text}</p></li>}
    </>
  )
}

export const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [p1, setP1] = useState<string>('');
  const [p2, setP2] = useState<string>('');
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const [requests, setRequests] = useState<any[]>([true]);
  const unique = useMemo(() => !!requests[requests.length - 1], [requests]);
  const [awaitFetch, setAwaitFetch] = useState<boolean>(false);

  useEffect(() => { setAwaitFetch(true) }, [name]);
  
  const nameValid = useMemo(() => name.length >= 5 && name.length < 15, [name]);
  const emailValid = useMemo(() => !email.length || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email), [email]);

  const split = useMemo(() => p1.split(''), [p1]);
  const p1Length = useMemo(() => p1.length >= 6, [p1.length]);
  const p1Special = useMemo(() => split.some(c => isNaN(Number(c)) && c.toUpperCase() === c.toLowerCase()), [split]); // has non-alphanumeric characters)
  const p1Upper = useMemo(() => split.some(c => c.toUpperCase() !== c.toLowerCase() && c === c.toUpperCase()), [split]); // has uppercase letter
  const p1Valid = useMemo(() => p1Length && p1Special && p1Upper, [p1Length, p1Special, p1Upper]);
  const p2Valid = useMemo(() => p1 === p2, [p1, p2]);

  const allValid = useMemo(() => nameValid && p1Valid && p2Valid && emailValid && unique, [emailValid, nameValid, p1Valid, p2Valid, unique]);

  const counterRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    if (!nameValid) return;
    clearTimeout(timeoutRef.current);

    const getUnique = async (prio: number) => {
      const response = await fetch(`http://localhost:8000/api/credentials/unique/${name}`);
      const data = await response.json();

      setAwaitFetch(false);

      setRequests(p => {
        let prev = [...p];
        prev[prio] = !data;

        return prev;
      })
    }

    timeoutRef.current = setTimeout(() => {
      counterRef.current = counterRef.current + 1;
      getUnique(counterRef.current);
    }, 1000);
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
        const user = await createUser({id, name, email, weekly_target: 0}).unwrap();
        createdUser = true;
        await addCredentials({ password: p1, user_id: user.id, username: name }).unwrap();

        navigate('/login');

      } catch(e) {
        console.log(e);
        if (createdUser) await deleteUser(id);
        setInputsDisabled(false);
      }
    })()
  }, [addCredentials, createUser, deleteUser, email, name, navigate, p1]);


  return (
    <div className='SignUp'>
      <div className="SignUp-creds" style={{width: '100%'}}>
        <Input className='SignUp-input' disabled={inputsDisabled} value={name} placeholder='username' onChange={(e) => setName(e.target.value)}/>
        <Input className='SignUp-input' disabled={inputsDisabled} value={email} placeholder='email (optional)' onChange={(e) => setEmail(e.target.value)}/>
        <Input className='SignUp-input' disabled={inputsDisabled} value={p1} placeholder='password' type='password' onChange={(e) => setP1(e.target.value)}/>
        <Input className='SignUp-input' disabled={inputsDisabled} value={p2} placeholder='confirm password' type='password' onChange={(e) => setP2(e.target.value)}/>
        <div className='SignUp-feedback'>
          <ul style={{marginTop: 12}}>
            {nameValid && <Li text='this username is taken' valid={unique} />}
            <Li text='username must be between 5 and 15 characters' valid={nameValid} />
            <Li text='please enter a valid email address' valid={emailValid} />
            <Li text='password must be minimum 6 characters in length' valid={p1Length} />
            <Li text='password must include at least one special character' valid={p1Special} />
            <Li text='password must include at least one uppercase character' valid={p1Upper} />
            {p1Valid && <Li text='passwords must match' valid={p2Valid} />}
          </ul>
        </div>
      </div>
      <p className="Login-create" onClick={() => navigate('/login')}>back</p>
    </div>
  )
}
