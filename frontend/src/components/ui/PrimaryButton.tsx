import './PrimaryButton.css';

import { IoIosFlash } from 'react-icons/io';

interface PrimaryButtonProps {
  text: string,
  onClick?: (...args: any) => void,
  logo?: boolean,
  colorTheme?: string,
}

export const PrimaryButton = ({text, onClick, logo, colorTheme}: PrimaryButtonProps) => {

  if (colorTheme) {};

  return (
    <div className='PrimaryButton' onClick={onClick}>
      <h2>{text}</h2>
      {logo && <div className='PrimaryButton-logo'>
        <IoIosFlash size={'67%'} />
      </div>}
    </div>
  )
}