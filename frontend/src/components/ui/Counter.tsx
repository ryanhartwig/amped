import React, { useCallback, useRef } from 'react';
import { useAppSelector } from '../../utility/helpers/hooks';
import './Counter.css';

/* React Icons */
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

interface CounterProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  incrementBy: number,
  background?: string,
  setValue: React.Dispatch<React.SetStateAction<number>>,
  max?: number,
  min?: number,
}

export const Counter = ({incrementBy, value, max = 999, min = 0, background, setValue, ...inputProps}: CounterProps) => {
  const inputRef = useRef<HTMLInputElement>(undefined!);

  const { background: defaultBackground } = useAppSelector(s => s.theme);
  if (!background) {
    background = defaultBackground;
  }

  const onSelect = useCallback((e: any) => {
    // Timeout prevents double-click effect (causing menu to open)
    setTimeout(() => inputRef.current.select(), 1);
  }, []);

  const onChangeCount = useCallback((e: any) => {
    if (isNaN(e.target.value)) return;

    let num = e.target.value;

    if (e.target.value.length) {
      num = Math.max(Math.min(Number(e.target.value), max), min);
    }

    setValue(num);
  }, [max, min, setValue]);

  const onStep = useCallback((n: number) => {
    let num = Math.max(Math.min(n + Number(value), max), min);    

    setValue(num);
  }, [max, min, setValue, value]);

  return (
    <div className='Counter'>
      <div className='Counter-change-value' 
        style={{background}}
        onClick={() => onStep(incrementBy * -1)}
      >
        <AiOutlineMinus size={11} />
      </div>
      <input style={{background}} 
        {...inputProps} 
        onFocus={onSelect} 
        className='Counter-input'
        onChange={onChangeCount}
        value={value}
        ref={inputRef} />
      <div className='Counter-change-value' 
        style={{background}}
        onClick={() => onStep(incrementBy)}
      >
        <AiOutlinePlus size={11} />
      </div>
    </div>
  )
}