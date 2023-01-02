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
  matchColorText?: boolean,
}



export const Tag = ({text, toggle, color = '#1e1e3f', onClick, style, fontSize = '', matchColorText}: TagProps) => {

  const filled: CSSProperties = toggle === 'add' 
  ? {
    border: `1px solid ${color}`,
    color: matchColorText ? color : '',
  } : {
    border: 'none',
    background: color,
    color: '',
  } 
  
  return (
    <div className={clsx('Tag', {toggle: !!toggle}, {'match-color-text': matchColorText})} 
      onClick={onClick} 
      style={{
        ...filled, 
        ...style,
      }}
    >
      {toggle &&
        (toggle === 'add' ? <IoAddSharp className='Tag-icon' style={{color: matchColorText ? color : 'white'}} size={15} />
        : <IoRemoveSharp className='Tag-icon' style={{color: 'white'}} size={15} />)}
      <p style={{fontSize}}>{text}</p>
    </div>
  )
}