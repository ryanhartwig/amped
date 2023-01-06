import './Checkbox.css';

import { useAppSelector } from '../../utility/helpers/hooks';

import { AiOutlineCheck } from 'react-icons/ai';

interface CheckboxProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  checked: boolean,
  label?: string,
  reverseLabelPosition?: boolean,
}

export const Checkbox = ({checked, label, reverseLabelPosition: r, ...props}: CheckboxProps) => {

  const { background } = useAppSelector(s => s.theme);

  return (
    <div onClick={props.onClick} className='Checkbox-wrapper' style={{flexDirection: r ? 'row-reverse' : 'row'}}>
      <div {...props} onClick={undefined} className={'Checkbox ' + props.className ?? ''} style={{background, ...props.style}} >
        {checked && <AiOutlineCheck size={48} className='Checkbox-icon' />}
      </div>
      {label && <p style={{marginLeft: r ? 0 : '', marginRight: r ? '' : 0}} className='Checkbox-label'>{label}</p>}
    </div>
    
  )
}