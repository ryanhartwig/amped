import './PrimaryButton.css';

import { IoIosFlash } from 'react-icons/io';
import clsx from 'clsx';
import { useAppSelector } from '../../utility/hooks';

interface PrimaryButtonProps {
  text: string,
  onClick?: (...args: any) => void,
  logo?: boolean,
  altColor?: boolean,
  transparent?: boolean,
}

export const PrimaryButton = ({text, onClick, logo, altColor, transparent}: PrimaryButtonProps) => {

  const altTheme = useAppSelector(s => s.theme.buttonSecondary);

  return (
    <div className={clsx('PrimaryButton', 'noselect')} style={{background: altColor ? altTheme : ''}} onClick={onClick}>
      <h2>{text}</h2>
      {logo && <div className='PrimaryButton-logo'>
        <IoIosFlash size={'67%'} />
      </div>}
    </div>
  )
}