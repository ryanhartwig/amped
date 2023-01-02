import { useCallback, useRef } from 'react';
import { useAppSelector } from '../../utility/helpers/hooks';
import './Counter.css';

interface CounterProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  incrementBy: number,
  background?: string,
  onChange: (e: any) => void,
  max?: number,
  min?: number,
}

export const Counter = ({incrementBy, max = 999, min = -90, background, onChange, ...inputProps}: CounterProps) => {
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

    if (e.target.value.length) {
      e.target.value = Math.max(Math.min(Number(e.target.value), max), min);
    }

    onChange(e);
  }, [max, min, onChange]);

  return (
    <div className='Counter'>
      <div className='Counter-change-value'>

      </div>
      <input style={{background}} 
        {...inputProps} 
        onFocus={onSelect} 
        className='Counter-input'
        onChange={onChangeCount}
        ref={inputRef} />
      <div className='Counter-change-value'>

      </div>
    </div>
  )
}