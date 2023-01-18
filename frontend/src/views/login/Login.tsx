import { Outlet } from 'react-router-dom';
import './Login.css';

export const Login = () => {

  return (
    <div className='Login'>
      <div className='Login-form'>
        <Outlet />
      </div>
    </div>
  )
}