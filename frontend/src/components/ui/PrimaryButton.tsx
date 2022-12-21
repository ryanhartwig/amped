import './PrimaryButton.css';

import { IoIosFlash } from 'react-icons/io';
import clsx from 'clsx';
import { useAppSelector } from '../../utility/hooks';
import { IconType } from 'react-icons/lib';

interface PrimaryButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string,
  icon?: IconType | 'logo',
  altColor?: boolean,
  className?: string,
  iconSize?: number,
  fontSize?: number | '',
}

export const PrimaryButton = ({text, fontSize = '', icon, iconSize = 19, altColor, className, ...props}: PrimaryButtonProps) => {
  const Icon = icon ? icon === 'logo' ? IoIosFlash : icon : undefined;
  const altTheme = useAppSelector(s => s.theme.buttonSecondary);

  return (
    <div {...props} className={clsx('PrimaryButton', 'noselect') + ' ' + className || ''} style={{background: altColor ? altTheme : '', ...props.style}} >
      <h2 style={{fontSize}}>{text}</h2>
      {Icon && <div className='PrimaryButton-logo'>
        <Icon size={iconSize} />
      </div>}
    </div>
  )
}