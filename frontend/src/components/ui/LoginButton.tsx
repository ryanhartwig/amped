import './LoginButton.css';

interface LoginButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text?: string,
}

export const LoginButton: React.FC<LoginButtonProps> = ({children, text, ...props}) => {


  return (
    <div {...props} className={`LoginButton ${props.className ?? ''}`}>
      <div className='LoginButton-logo'>
        {children}
      </div>
      <p>{text}</p>
    </div>
  )
}