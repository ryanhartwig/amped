import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from '../../components/ui/Input';
import { LoginButton } from '../../components/ui/LoginButton';
import './Reset.css'
import { Li } from './SignUp';


export const Reset = () => {
  const navigate = useNavigate();

  const { reset_id } = useParams();

  const [valid, setValid] = useState<boolean>();
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [p1, setP1] = useState<string>('');
  const [p2, setP2] = useState<string>('');

  const [user_id, setUser_id] = useState<string>();

  const split = useMemo(() => p1.split(''), [p1]);
  const p1Length = useMemo(() => p1.length >= 6, [p1.length]);
  const p1Special = useMemo(() => split.some(c => isNaN(Number(c)) && c.toUpperCase() === c.toLowerCase()), [split]); // has non-alphanumeric characters)
  const p1Upper = useMemo(() => split.some(c => c.toUpperCase() !== c.toLowerCase() && c === c.toUpperCase()), [split]); // has uppercase letter
  const p1Valid = useMemo(() => p1Length && p1Special && p1Upper, [p1Length, p1Special, p1Upper]);
  const p2Valid = useMemo(() => p1 === p2, [p1, p2]);


  useEffect(() => {
    if (!reset_id) navigate('/login')

    ;(async () => {
      const response = await fetch(`http://localhost:8000/api/credentials/reset/${reset_id}`);
      if (response.ok) {
        const data = await response.json();
        setUser_id(data);
        setValid(true);
      }
      else setValid(false);
    })()
  }, [navigate, reset_id]);

  
  const onSubmit = useCallback(() => {
    setInputsDisabled(true);
    setError(false);

    ;(async () => {
      // Re-verify reset_id and time
      const resetLink = await fetch(`http://localhost:8000/api/credentials/reset/${reset_id}`);
      if (!resetLink.ok) {
        return setValid(false);
      }
      
      
      try {
        const response = await fetch('http://localhost:8000/api/credentials/password', {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({user_id, password: p1}),
        });
        if (!response.ok) throw new Error('No update');
        setSuccess(true);
      } catch(e) {
        console.log(e);
        setError(true);
        setInputsDisabled(false);
      }
    })();
  }, [p1, reset_id, user_id]);

  return (
    <div className='Reset'>
      <p>{valid === undefined ? 'Validating link...' : valid ? 'Enter a new password' : 'Invalid or expired link'}</p>

      {valid && (success ? <div><p>Success! Your password has been updated.</p></div> 
    : <div>
        <Input className='SignUp-input' disabled={inputsDisabled} value={p1} placeholder='password' type='password' onChange={(e) => setP1(e.target.value)}/>
        <Input className='SignUp-input' disabled={inputsDisabled} value={p2} placeholder='confirm password' type='password' onChange={(e) => setP2(e.target.value)}/>
        <div className='SignUp-feedback'>
          <ul style={{marginTop: 12}}>
            <Li text='something went wrong, please try again' valid={!error} />
            <Li text='password must be minimum 6 characters in length' valid={p1Length} />
            <Li text='password must include at least one special character' valid={p1Special} />
            <Li text='password must include at least one uppercase character' valid={p1Upper} />
            {p1Valid && <Li text='passwords must match' valid={p2Valid} />}
          </ul>
        </div>
        <LoginButton style={{marginTop: 15}} onClick={onSubmit} disabled={!p2Valid || !p1Valid || inputsDisabled} text={'Submit'} />
      </div>)}
      
      
      <div className='SignUp-cancel'>
        <p onClick={() => navigate('/login')}>back</p>
      </div>
    </div>
  )
}