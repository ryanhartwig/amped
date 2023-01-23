import './SignUp.css';
import { Input } from "../../components/ui/Input"
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { useCreateNewUserMutation, useDeleteUserMutation } from '../../api/injections/user/userSlice';
import { useAddCredentialsMutation, useSignInLocalMutation } from '../../api/injections/user/authSlice';
import { LoginButton } from '../../components/ui/LoginButton';
import { IoIosArrowRoundBack } from 'react-icons/io';

export const Li = ({text, valid, className = ''}: {text: string, valid: boolean, className?: string}) => {
  return (
    <>
      {!valid && <li className={className}><p>{text}</p></li>}
    </>
  )
}

export const SignUp = () => {
  const navigate = useNavigate();

  const [signIn] = useSignInLocalMutation();
  const [createUser] = useCreateNewUserMutation();
  const [addCredentials] = useAddCredentialsMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [name, setName] = useState<string>('');
  const [taken, setTaken] = useState<string>('');
  const [p1, setP1] = useState<string>('');
  const [p2, setP2] = useState<string>('');
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailTaken, setEmailTaken] = useState<boolean>(false);
  const [validating, setValidating] = useState<boolean>(false);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [slideChange, setSlideChange] = useState<boolean>(false);

  // cache server responses of used emails
  const usedEmails = useMemo(() => new Set<string>(''), []);

  const nameValid = useMemo(() => name.length >= 5 && name.length < 15, [name]);
  const emailValid = useMemo(() => !email.length || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email), [email]);
  const split = useMemo(() => p1.split(''), [p1]);
  const p1Length = useMemo(() => p1.length >= 6, [p1.length]);
  const p1Special = useMemo(() => split.some(c => isNaN(Number(c)) && c.toUpperCase() === c.toLowerCase()), [split]); // has non-alphanumeric characters)
  const p1Upper = useMemo(() => split.some(c => c.toUpperCase() !== c.toLowerCase() && c === c.toUpperCase()), [split]); // has uppercase letter
  const p1Valid = useMemo(() => p1Length && p1Special && p1Upper, [p1Length, p1Special, p1Upper]);
  const p2Valid = useMemo(() => p1 === p2, [p1, p2]);

  const nameRef = useRef<HTMLDivElement>(undefined!);
  const p1Ref = useRef<HTMLDivElement>(undefined!);
  const p2Ref = useRef<HTMLDivElement>(undefined!);
  const emailRef = useRef<HTMLDivElement>(undefined!);

  const nameInput = useRef<HTMLInputElement>(undefined!);
  const p1Input = useRef<HTMLInputElement>(undefined!);
  const p2Input = useRef<HTMLInputElement>(undefined!);
  const emailInput = useRef<HTMLInputElement>(undefined!);
  const inputRefs = useMemo(() => [nameInput, p1Input, p2Input, emailInput], []);

  useEffect(() => {
    setEmailTaken(false);
    if (usedEmails.has(email)) setEmailTaken(true);
  }, [email, usedEmails])
  
  useEffect(() => {
    setSlideChange(true);
    setTimeout(() => {
      inputRefs[slideIndex].current.focus();
      setSlideChange(false);
    }, 500);
  }, [inputRefs, slideIndex]);

  const onCheckUsername = useCallback(() => {
    ;(async () => {
      setValidating(true);

      const response = await fetch(`https://amped.herokuapp.com/api/credentials/exists/${name}`);
      const existing = await response.json();

      setValidating(false);

      if (existing !== null) {
        setTaken(existing);
      } else {
        setSlideIndex(1);
        setTaken('');
      }
    })()
  }, [name]);

  const onSubmit = useCallback(() => {
    ;(async () => {
      setValidating(true);
      setError(false);
      setInputsDisabled(true);

      const id = uuid();
      let createdUser = false;

      /* Validate email is unique */
      if (email) {
        try {
          const response = await fetch(`https://amped.herokuapp.com/api/credentials/email/exists/${email}`);
          const exists = await response.json();
          
          if (exists) {
            setValidating(false);
            setInputsDisabled(false);
            setEmailTaken(true);
            usedEmails.add(exists);
            setTimeout(() => emailInput.current.focus(), 100);
            return;
          }
        } catch(e) {
          console.log(e);
          setValidating(false);
          setInputsDisabled(false);
          setError(true);
          return;
        }
      }
      
      /* Create new user and login */
      try {
        const user = await createUser({id, name, email, weekly_target: 0}).unwrap();
        createdUser = true;
        await addCredentials({ password: p1, user_id: user.id, username: name }).unwrap();
        await signIn({username: name, password: p1}).unwrap()
        navigate('/home/dash');

      } catch(e) {
        console.log(e);
        if (createdUser) await deleteUser(id);
        setValidating(false);
        setError(true);
        setInputsDisabled(false);
      }
    })()
  }, [addCredentials, createUser, deleteUser, email, name, navigate, p1, signIn, usedEmails]);

  return (
    <div className='SignUp'>
      <div className="SignUp-creds" style={{width: '100%'}}>
        <p>Welcome</p>
        <div className='SignUp-slides-container' style={{left: -1 * (slideIndex * 280)}}>
          <div className='SignUp-slide'>
            <p className='SignUp-tip'>Enter a username</p>
            <Input ref={nameInput} onEnter={() => nameRef.current.click()} tabIndex={-1} className='SignUp-input' disabled={inputsDisabled} value={name} placeholder='username' onChange={(e) => setName(e.target.value)}/>
            <div className='SignUp-feedback'>
              <ul style={{marginTop: 12}}>
                <Li text={`username ${taken} is taken`} valid={!taken} />
                <Li text='username must be between 5 and 15 characters' valid={nameValid} />
              </ul>
            </div>
            <LoginButton ref={nameRef} onClick={!nameValid ? undefined : onCheckUsername} text='Continue' style={{width: '90%', margin: '30px auto 0 auto'}} disabled={validating || !nameValid} />
          </div>
          <div className='SignUp-slide'>
            <p className='SignUp-tip'>Enter a password</p>
            <Input ref={p1Input} onEnter={() => p1Ref.current.click()} tabIndex={-1} className='SignUp-input' disabled={inputsDisabled} value={p1} placeholder='password' type='password' onChange={(e) => setP1(e.target.value)}/>
            <div className='SignUp-feedback'>
              <ul style={{marginTop: 12}}>
                <Li text='password must be minimum 6 characters in length' valid={p1Length} />
                <Li text='password must include at least one special character' valid={p1Special} />
                <Li text='password must include at least one uppercase character' valid={p1Upper} />
              </ul>
            </div>
            <LoginButton ref={p1Ref} onClick={!p1Valid ? undefined : () => setSlideIndex(2)} text='Continue' style={{width: '90%', margin: '30px auto 0 auto'}} disabled={!p1Valid} />
            <div className='SignUp-back'>
              <div className='SignUp-back-arrow' onClick={slideChange ? undefined : () => setSlideIndex(p => p - 1)}>
                <IoIosArrowRoundBack size={24} />
                <p>back</p>
              </div>
            </div>
          </div>
          <div className='SignUp-slide'>
            <p className='SignUp-tip'>Confirm password</p>
            <Input ref={p2Input} onEnter={() => p2Ref.current.click()} tabIndex={-1} className='SignUp-input' disabled={inputsDisabled} value={p2} placeholder='confirm password' type='password' onChange={(e) => setP2(e.target.value)}/>
            <div className='SignUp-feedback'>
              <ul style={{marginTop: 12}}>
                {p1Valid && <Li text='passwords must match' valid={p2Valid} />}
              </ul>
            </div>
            <LoginButton ref={p2Ref} onClick={!p2Valid ? undefined : () => setSlideIndex(3)} text='Continue' style={{width: '90%', margin: '30px auto 0 auto'}} disabled={!p2Valid} />
            <div className='SignUp-back'>
              <div className='SignUp-back-arrow' onClick={slideChange ? undefined : () => setSlideIndex(p => p - 1)}>
                <IoIosArrowRoundBack size={24} />
                <p>back</p>
              </div>
            </div>
          </div>
          <div className='SignUp-slide'>
            <p className='SignUp-tip'>Enter email</p>
            <p className='SignUp-tip' style={{fontSize: '0.8em'}}>(will be used to reset password)</p>
            <Input ref={emailInput} onEnter={() => emailRef.current.click()} tabIndex={-1} className='SignUp-input' disabled={inputsDisabled} value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
            <div className='SignUp-feedback'>
              <ul style={{marginTop: 12}}>
                <Li text='this email address is already in use' valid={!emailTaken} />
                <Li text='please enter a valid email address' valid={emailValid} />
                <Li text='something went wrong (check input fields or try again)' valid={!error} />
              </ul>
            </div>
            <LoginButton ref={emailRef} onClick={!emailValid ? undefined : onSubmit} text={!email.length ? 'Skip' : 'Continue'} style={{width: '90%', margin: '30px auto 0 auto'}} disabled={!emailValid} />
            <div className='SignUp-back'>
              <div className='SignUp-back-arrow' onClick={slideChange ? undefined : () => setSlideIndex(p => p - 1)}>
                <IoIosArrowRoundBack size={24} />
                <p>back</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className='SignUp-cancel'>
          <p onClick={() => navigate('/login')}>cancel</p>
        </div>
      </div>
      
      
    </div>
  )
}
