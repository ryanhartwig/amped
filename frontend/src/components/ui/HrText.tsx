import './HrText.css';

interface HrTextProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text?: string,
  background?: string,
  textFontSize?: number | string,
  textBottomOffset?: number,
  children?: React.ReactNode,
}

export const HrText: React.FC<HrTextProps> = ({text, textBottomOffset, background, children, textFontSize, ...props}) => {

  return (
    <div {...props} className={"HrText " + props.className ?? ''} >
      <hr></hr>
      <div className='HrText-front' style={{bottom: textBottomOffset}} >
        {children 
          ? children 
          : <p style={{fontSize: textFontSize, background}}>{text}</p>
        }
      </div>
    </div>
  )
}