import { Outlet } from 'react-router-dom';
import { HrText } from '../../components/ui/HrText';
import { Logo } from '../../components/ui/Logo';
import './Login.css';

export const Login = () => {

  return (
    <div className='Login'>
      <HrText style={{marginBottom: 15, width: 300}}><Logo style={{padding: '0 11px', scale: '1.5', background: 'black'}} hideLogo /></HrText>
      <div className='Login-form'>
        <Outlet />
      </div>
    </div>
  )
}