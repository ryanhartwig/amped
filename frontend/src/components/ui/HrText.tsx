import './HrText.css';

interface HrTextProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text?: string,
  background?: string,
  textFontSize?: number | string,
  textBottomOffset?: number,
}

export const HrText: React.FC<HrTextProps> = ({text, textBottomOffset, background, textFontSize, ...props}) => {

  return (
    <div {...props} className={"HrText " + props.className ?? ''} >
      <hr></hr>
      <div className='HrText-front' style={{bottom: textBottomOffset}} >
        <p style={{fontSize: textFontSize, background}}>{text}</p>
      </div>
    </div>
  )
}