import { Outlet } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import './Login.css';

export const Login = () => {

  return (
    <div className='Login'>
      <Logo style={{scale: '1.5', marginBottom: 25}} hideLogo />
      <div className='Login-form'>
        <Outlet />
      </div>
    </div>
  )
}