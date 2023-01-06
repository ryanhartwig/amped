import './Checkbox.css';

import { useAppSelector } from '../../utility/helpers/hooks';

import { AiOutlineCheck } from 'react-icons/ai';

interface CheckboxProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  checked: boolean,
  label?: string,
  reverseLabelPosition?: boolean,
  checkboxBackground?: string,
}

export const Checkbox = ({checked, checkboxBackground, label, reverseLabelPosition: r, ...props}: CheckboxProps) => {

  const { background } = useAppSelector(s => s.theme);

  return (
    <div {...props} className={'Checkbox ' + props.className ?? ''} style={{...props.style, flexDirection: r ? 'row-reverse' : 'row'}}>
      <div className='Checkbox-box' style={{background: checkboxBackground ?? background}} >
        {checked && <AiOutlineCheck size={48} className='Checkbox-icon' />}
      </div>
      {label && <p style={{marginLeft: r ? 0 : '', marginRight: r ? '' : 0}} className='Checkbox-label'>{label}</p>}
    </div>
  )
}