import './Tag.css';

/* React Icons */
import { IoAddSharp, IoRemoveSharp } from 'react-icons/io5';
import clsx from 'clsx';
import { CSSProperties } from 'react';

interface TagProps {
  text: string,
  toggle?: 'add' | 'remove',
  color?: string,
  onClick?: (...args: any) => void,
  style?: CSSProperties,
  fontSize?: string,
}



export const Tag = ({text, toggle, color = '#1e1e3f', onClick, style, fontSize = ''}: TagProps) => {

  const filled: CSSProperties = toggle === 'add' 
  ? {
    border: `1px solid ${color}`
  } : {
    border: 'none',
    background: color,
  } 
  
  return (
    <div className={clsx('Tag', {toggle: !!toggle})} 
      onClick={onClick} 
      style={{
        ...filled, 
        ...style,
      }}
    >
      {toggle &&
        (toggle === 'add' ? <IoAddSharp className='Tag-icon' size={15} />
        : <IoRemoveSharp className='Tag-icon' size={15} />)}
      <p style={{fontSize}}>{text}</p>
    </div>
  )
}