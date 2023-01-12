import React from 'react';
import { Timer } from '../stats/Timer';
import './SecondaryButton.css';

interface SecondaryButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string,
  time?: number,
  setTime?: React.Dispatch<React.SetStateAction<number>>,
  disabled?: boolean,
}

export const SecondaryButton = ({text, disabled, time, setTime, ...props}: SecondaryButtonProps) => {

  return (
    <div {...props} 
      className={'SecondaryButton ' + props.className} 
      style={{
        ...props.style, 
        pointerEvents: disabled ? 'none' : 'auto', 
        opacity: disabled ? '0.5' : '' 
      }}
    >
      <p>{text}</p>
      {time !== undefined && setTime && <Timer time={time} setTime={setTime} />}
    </div>
  )
}