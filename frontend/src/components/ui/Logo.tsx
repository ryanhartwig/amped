import './Logo.css';

/* React Icons */
import { IoIosFlash } from 'react-icons/io';
import { CSSProperties } from 'react';

interface LogoProps {
  hideLogo?: boolean,
  style?: CSSProperties,
}

export const Logo: React.FC<LogoProps> = ({hideLogo, style}) => {


  return (
    <div className='Logo noselect' style={style}>
      <h1>AMP<span className='logo-thin'>ED</span></h1>
      {!hideLogo && <IoIosFlash />}
    </div>
  )
}