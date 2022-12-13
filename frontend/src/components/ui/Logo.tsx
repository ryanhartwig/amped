import './Logo.css';

/* React Icons */
import { IoIosFlash } from 'react-icons/io';

// interface LogoProps {

// }

export const Logo = () => {

  return (
    <div className='Logo noselect'>
      <h1>AMP<span className='logo-thin'>ED</span></h1>
      <IoIosFlash />
    </div>
  )
}