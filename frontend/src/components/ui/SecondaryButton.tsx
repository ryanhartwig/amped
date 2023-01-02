import React from 'react';
import { Timer } from '../stats/Timer';
import './SecondaryButton.css';

interface SecondaryButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string,
  time?: number,
  setTime?: React.Dispatch<React.SetStateAction<number>>,
}

export const SecondaryButton = ({text, time, setTime, ...props}: SecondaryButtonProps) => {



  return (
    <div {...props} className={'SecondaryButton ' + props.className} >
      <p>{text}</p>
      {time !== undefined && setTime && <Timer time={time} setTime={setTime} />}
    </div>
  )
}