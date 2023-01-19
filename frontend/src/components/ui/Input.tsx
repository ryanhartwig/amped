import React from 'react';
import './Input.css';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string,
  mini?: boolean,
  onEnter?: (...args: any) => void,
  icon?: React.ReactNode,
}

export const Input = React.forwardRef((props: InputProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
  const {onEnter, icon, className = '', mini = false, ...rest} = props
  
  return (
    <div className='Input' style={{width: '100%'}}>
      <input {...rest} 
        ref={ref}
        className={`${className ?? ''} ${mini ? 'mini' : ''}`}
        onKeyDown={(e) => e.key === 'Enter' && onEnter && onEnter()}/>
      {icon}
    </div>
  )
})