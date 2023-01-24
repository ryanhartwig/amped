import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/ui/Input';
import { LoginButton } from '../../components/ui/LoginButton';
import { baseUrl } from '../../utility/data/baseUrl';
import { Li } from './SignUp';
import './Verify.css'



export const Verify = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [fetching, setFetching] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const emailValid = useMemo(() => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email), [email]);

  const submitRef = useRef<HTMLDivElement>(undefined!);

  const onSubmit = useCallback(() => {
    setFetching(true);
    setSuccess(false);
    ;(async () => {
      const response = await fetch(`${baseUrl}/credentials/verify/${email}`);
      if (response.ok) {
        setSuccess(true);
        setFetching(false);
      } else {
        // Simulate duration
        setTimeout(() => {
          setSuccess(true);
          setFetching(false);
        }, 1200);
      }
    })()
  }, [email]);

  return (
    <div className='Verify'>
      <p>Forgot Password</p>

      {success ? <p className='Verify-success'>If an account exists with the provided email, the email has been sent.<br /><br /> Be sure to check your junk / spam folder.</p> : <div className='Verify-input'>
        <p>Enter your email address</p>
        <Input onEnter={emailValid ? () => submitRef.current.click() : undefined} disabled={fetching} tabIndex={-1} className='Verify-email' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
        <div className='SignUp-feedback'>
          <ul style={{marginTop: 12}}>
            <Li text='enter a valid email address' valid={emailValid} />
          </ul>
        </div>
        <LoginButton ref={submitRef} onClick={onSubmit} style={{marginTop: 15}} disabled={!emailValid || fetching} text='Submit' />
      </div>}
      
      <div className='SignUp-cancel'>
        <p onClick={() => navigate('/login')}>back</p>
      </div>
    </div>
  )
}