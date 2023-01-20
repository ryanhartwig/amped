import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/ui/Input';
import { LoginButton } from '../../components/ui/LoginButton';
import { Li } from './SignUp';
import './Verify.css'



export const Verify = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [fetching, setFetching] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const emailValid = useMemo(() => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email), [email]);

  const onSubmit = useCallback(() => {
    setFetching(true);
    setSuccess(false);
    ;(async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/credentials/verify/${email}`);
        if (response.ok) {
          setSuccess(true);
        }
      } catch(e) { 
        console.log(e)
      } finally {
        setFetching(false);
      }
    })()
  }, [email]);

  return (
    <div className='Verify'>
      <p>Forgot Password</p>

      <div className='Verify-input'>
        <p>Enter your email address</p>
        <Input disabled={fetching} tabIndex={-1} className='Verify-email' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
        <div className='SignUp-feedback'>
          <ul style={{marginTop: 12}}>
            <Li text='enter a valid email address' valid={emailValid} />
            <Li className='Verify-success' text='if an account exists with the provided email, an email has been sent' valid={!success} />
          </ul>
        </div>
        <LoginButton onClick={onSubmit} style={{marginTop: 15}} disabled={!emailValid || fetching} text='Submit' />
        
      </div>
      
      <div className='SignUp-cancel'>
        <p onClick={() => navigate('/login')}>cancel</p>
      </div>
    </div>
  )
}