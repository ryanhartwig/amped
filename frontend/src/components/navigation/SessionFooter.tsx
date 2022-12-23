import './SessionFooter.css';

import { useAppSelector } from '../../utility/helpers/hooks';

export const SessionFooter = () => {

  const { foreground: background } = useAppSelector(s => s.theme);
  
  return (
    <div className='SessionFooter' style={{background}}>
      <div className='SessionFooter-items'>
        <p>footer</p>
      </div>
    </div>
  )
}