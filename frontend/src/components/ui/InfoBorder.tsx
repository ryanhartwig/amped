import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import './InfoBorder.css';
import { Modal } from './Modal';

interface InfoBorderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string,
  children?: React.ReactNode,
  buttonText?: string,
  className?: string,
  background: string,
  isButton?: boolean,
  setOpenButtonRef?: React.Dispatch<React.SetStateAction<MutableRefObject<HTMLDivElement>>>,
  modalContent?: React.ReactNode,
  modalHeader?: React.ReactNode,
}

export const InfoBorder = ({children, modalHeader, modalContent, setOpenButtonRef, onClick, isButton, background, title, buttonText, className = '', ...rest}: InfoBorderProps) => {
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

  const [open, setOpen] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement>(undefined!);

  useEffect(() => {
    setOpenButtonRef && setOpenButtonRef(divRef);
  }, [setOpenButtonRef]);

  return (
    <div {...rest} className={'InfoBorder ' + className} style={{...rest.style, cursor: isButton ? 'pointer' : ''}}>
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
      {buttonText && <div onClick={() => setOpen(true)} className='InfoBorder-button ' ref={divRef}>
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

      <Modal closeText='Close' triggerRef={divRef} open={open} onClose={() => setOpen(false)} >
          <Modal.Header>{modalHeader}</Modal.Header>
          {modalContent}
      </Modal>

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