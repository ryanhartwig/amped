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
      <div className='InfoBorder-title' >
        <div style={{background}}><p>{title}</p></div>
      </div>
      <div className='InfoBorder-head'>
        <div className='InfoBorder-head-left' style={{background}}>
          {hl}
        </div>
        <div className='InfoBorder-head-right' style={{background}}>
          {hr}
        </div>
      </div>
      <div className='InfoBorder-foot'>
        <div className='InfoBorder-foot-left' style={{background}}>
          {fl}
        </div>
        <div className='InfoBorder-foot-center' style={{background}}>
          {buttonText}
        </div>
        <div className='InfoBorder-foot-right' style={{background}}>
          {fr}
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