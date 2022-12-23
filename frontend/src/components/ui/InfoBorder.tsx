import React from 'react';
import { useAppSelector } from '../../utility/helpers/hooks';
import './InfoBorder.css';

interface InfoBorderProps {
  title?: string,
  children?: React.ReactNode,
  buttonText?: string,
}

export const InfoBorder = ({children, title, buttonText}: InfoBorderProps) => {
  const hl = React.Children.map(children, (child: any) => child.type.displayName === 'HeaderLeft' ? child : null)
  const hr = React.Children.map(children, (child: any) => child.type.displayName === 'HeaderRight' ? child : null)
  const fl = React.Children.map(children, (child: any) => child.type.displayName === 'FooterLeft' ? child : null)
  const fr = React.Children.map(children, (child: any) => child.type.displayName === 'FooterRight' ? child : null)

  const content = React.Children
    .map(children, (child: any) => 
      ['HeaderLeft', 'HeaderRight', 'FooterLeft', 'FooterRight'].includes(child.type.displayName) 
        ? null 
        : child
  );

  const { background } = useAppSelector(s => s.theme);

  return (
    <div className='InfoBorder'>
      {/* Center / title */}
      <div className='InfoBorder-title noselect' >
        <div style={{background}}><p>{title}</p></div>
      </div>

      {/* Left / right top line */}
      <div className='InfoBorder-head noselect'>
        <div className='InfoBorder-head-left'>
          <div style={{background}}>{hl}</div>
        </div>
        <div className='InfoBorder-head-right' >
          <div style={{background}}>{hr}</div>
        </div>
      </div>

      {/* Button, center bottom */}
      {buttonText && <div className='InfoBorder-button ' >
        <div style={{background}}><p>{buttonText}</p></div>
      </div>}

      {/* Left / right bottom line */}
      <div className='InfoBorder-foot noselect'>
        <div className='InfoBorder-foot-left' >
          <div style={{background}}>{fl}</div>
        </div>
        <div className='InfoBorder-foot-right' >
          <div style={{background}}>{fr}</div>
        </div>
      </div>

      {content}
    </div>
  )
}

const HeaderLeft = ({children}: any) => children;
HeaderLeft.displayName = 'HeaderLeft';
InfoBorder.HeaderLeft = HeaderLeft;

const HeaderRight = ({children}: any) => children;
HeaderRight.displayName = 'HeaderRight';
InfoBorder.HeaderRight = HeaderRight;

const FooterLeft = ({children}: any) => children;
FooterLeft.displayName = 'FooterLeft';
InfoBorder.FooterLeft = FooterLeft;

const FooterRight = ({children}: any) => children;
FooterRight.displayName = 'FooterRight';
InfoBorder.FooterRight = FooterRight;