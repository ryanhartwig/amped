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
}

export const Input = ({placeholder, onEnter, onChange, value, style, className = '', mini = false}: InputProps) => {
  
  return (
    <div className='Input'>
      <input style={{...style, }} 
        className={`${className} ${mini ? 'mini' : ''}`}
        placeholder={placeholder} 
        value={value} 
        onKeyDown={(e) => e.key === 'Enter' && onEnter && onEnter()}
        onChange={onChange} />
    </div>
  )
}