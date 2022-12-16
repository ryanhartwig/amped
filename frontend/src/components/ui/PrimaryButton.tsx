import './PrimaryButton.css';

import { IoIosFlash } from 'react-icons/io';
import clsx from 'clsx';
import { useAppSelector } from '../../utility/hooks';
import { IconType } from 'react-icons/lib';

interface PrimaryButtonProps {
  text: string,
  onClick?: (...args: any) => void,
  logo?: boolean,
  Icon?: IconType,
  altColor?: boolean,
  transparent?: boolean,
}

export const PrimaryButton = ({text, onClick, Icon = IoIosFlash, logo, altColor, transparent}: PrimaryButtonProps) => {

  const altTheme = useAppSelector(s => s.theme.buttonSecondary);



  return (
    <div className={clsx('PrimaryButton', 'noselect')} style={{background: altColor ? altTheme : ''}} onClick={onClick}>
      <h2>{text}</h2>
      {logo && <div className='PrimaryButton-logo'>
        <Icon size={'28px'} />
      </div>}
    </div>
  )
}