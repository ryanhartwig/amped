import clsx from 'clsx';
import React from 'react';
import './LoginButton.css';

interface LoginButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text?: string,
  disabled?: boolean,
}

export const LoginButton = React.forwardRef((props: LoginButtonProps, ref?: React.ForwardedRef<HTMLDivElement>) => {
  const { className, children, disabled, text, ...rest } = props;

  return (
    <div {...rest} ref={ref} className={clsx('LoginButton', {className: !!className}, {'disabled': disabled})}>
      

      <div className='LoginButton-logo'>
        {children}
      </div>
      <p>{text}</p>
    </div>
  )
})