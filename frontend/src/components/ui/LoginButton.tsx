import clsx from 'clsx';
import './LoginButton.css';

interface LoginButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text?: string,
  disabled?: boolean,
}

export const LoginButton: React.FC<LoginButtonProps> = ({children, disabled, text, ...props}) => {
  const { className } = props;

  return (
    <div {...props} className={clsx('LoginButton', {className: !!className}, {'disabled': disabled})}>
      

      <div className='LoginButton-logo'>
        {children}
      </div>
      <p>{text}</p>
    </div>
  )
}