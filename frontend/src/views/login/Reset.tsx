import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './Reset.css'


export const Reset = () => {
  const navigate = useNavigate();

  const { user_id } = useParams();
  // const [valid, setValid] = useState<boolean>();

  useEffect(() => {
    if (!user_id) navigate('/login')

    ;(async () => {
      // const response = await fetch('')
    })()
    
  }, [navigate, user_id])
  

  return (
    <div className='Reset'>
      <p></p>

      
      <div className='SignUp-cancel'>
        <p onClick={() => navigate('/login')}>cancel</p>
      </div>
    </div>
  )
}