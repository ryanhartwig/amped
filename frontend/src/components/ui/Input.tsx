import { CSSProperties } from 'react';
import './Input.css';

interface InputProps {
  onChange: (...args: any) => void,
  style?: CSSProperties,
  value: string,
  placeholder?: string,
  className?: string,
  mini?: boolean,
  onEnter?: (...args: any) => void,
  required?: boolean,
}

export const Input = ({placeholder, required, onEnter, onChange, value, style, className = '', mini = false}: InputProps) => {
  
  return (
    <div className='Input'>
      <input style={{...style, }} 
        className={`${className} ${mini ? 'mini' : ''}`}
        placeholder={placeholder} 
        value={value} 
        required={required}
        onKeyDown={(e) => e.key === 'Enter' && onEnter && onEnter()}
        onChange={onChange} />
    </div>
  )
}