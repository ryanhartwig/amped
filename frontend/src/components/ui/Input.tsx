import './Input.css';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string,
  mini?: boolean,
  onEnter?: (...args: any) => void,
}

export const Input: React.FC<InputProps> = ({onEnter, className = '', mini = false, ...props}) => {
  
  return (
    <div className='Input' style={{width: '100%'}}>
      <input {...props} 
        className={`${className} ${mini ? 'mini' : ''}`}
        onKeyDown={(e) => e.key === 'Enter' && onEnter && onEnter()}/>
    </div>
  )
}