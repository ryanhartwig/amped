import './PrimaryButton.css';

import { IoIosFlash } from 'react-icons/io';
import clsx from 'clsx';
import { useAppSelector } from '../../utility/hooks';
import { IconType } from 'react-icons/lib';

interface PrimaryButtonProps {
  text: string,
  onClick?: (...args: any) => void,
  icon?: IconType | 'logo',
  altColor?: boolean,
  transparent?: boolean,
}

export const PrimaryButton = ({text, onClick, icon, altColor, transparent}: PrimaryButtonProps) => {
  const Icon = icon ? icon === 'logo' ? IoIosFlash : icon : undefined;
  const altTheme = useAppSelector(s => s.theme.buttonSecondary);

  return (
    <div className={clsx('PrimaryButton', 'noselect')} style={{background: altColor ? altTheme : ''}} onClick={onClick}>
      <h2>{text}</h2>
      {Icon && <div className='PrimaryButton-logo'>
        <Icon size={'24px'} />
      </div>}
    </div>
  )
}