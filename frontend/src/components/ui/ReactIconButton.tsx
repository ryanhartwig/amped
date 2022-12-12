import clsx from 'clsx';
import React from 'react';
import './ReactIconButton.css';

interface ReactIconButtonProps {
  children?: React.ReactNode,
  className?: string,
  style?: React.CSSProperties,
  onClick?: (...args: any) => any,
  text?: string,
  buttonSize?: string,
  fontSize?: string,
}

export const ReactIconButton = ({children, fontSize, buttonSize, className = '', style, onClick, text}: ReactIconButtonProps) => {

  const size = {
    maxHeight: buttonSize,
    minHeight: buttonSize,
    maxWidth: buttonSize,
    minWidth: buttonSize,
  }
  
  return (
    <div style={{...size}} className={clsx('ReactIconButton', className)}>
      {children}
      {text && <p className='rib-text' style={{fontSize}}>{text}</p>}
    </div>
  )
}