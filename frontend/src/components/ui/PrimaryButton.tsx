import './PrimaryButton.css';

import { IoIosFlash } from 'react-icons/io';
import clsx from 'clsx';
import { useAppSelector } from '../../utility/hooks';
import { IconType } from 'react-icons/lib';
import React from 'react';

interface PrimaryButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string,
  icon?: IconType | 'logo',
  altColor?: boolean,
  className?: string,
  iconSize?: number,
  fontSize?: number | '',
}

export const PrimaryButton = React.forwardRef(({text, fontSize = '', icon, iconSize = 19, altColor, className, ...rest}: PrimaryButtonProps, ref: React.ForwardedRef<HTMLDivElement> | undefined) => {
  const Icon = icon ? icon === 'logo' ? IoIosFlash : icon : undefined;
  const altTheme = useAppSelector(s => s.theme.buttonSecondary);

  return (
    <div {...rest} ref={ref} className={clsx('PrimaryButton', 'noselect') + ' ' + className || ''} style={{background: altColor ? altTheme : '', ...rest.style}} >
      <h2 style={{fontSize}}>{text}</h2>
      {Icon && <div className='PrimaryButton-logo'>
        <Icon size={iconSize} />
      </div>}
    </div>
  )
});