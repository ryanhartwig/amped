
import React from 'react';
import { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppSelector } from '../../utility/helpers/hooks';
import { useClickout } from '../../utility/helpers/hooks/useClickout';
import './Modal.css';

/* React Icons */

interface ModalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  onClose: (...args: any) => void,
  open: boolean,
  triggerRef: React.MutableRefObject<any>,
  closeText?: string;
}

export const Modal = ({children, onClose, open, triggerRef, closeText, ...divProps}: ModalProps) => {
  const header = React.Children.map(children, (child: any) => child?.type?.displayName === 'Header' ? child : null)
  const content = React.Children.map(children, (child: any) => child?.type?.displayName !== 'Header' ? child : null)

  console.log(header);
  const { background } = useAppSelector(s => s.theme);
  
  const contentRef = useRef<HTMLDivElement>(undefined!);
  useClickout(onClose, contentRef, triggerRef);

  return (
    <>
      {open && <div  className='Modal noselect'>
        
        <div className={'Modal-box '} ref={contentRef} style={{background}}>
          {!!header?.length && <div className='Modal-header'>
            <h2>{header}</h2>
            <hr></hr>
        </div>}
          <div {...divProps} className={'Modal-content ' + divProps.className ?? ''}>
            {content}
          </div>
          {closeText && 
          <div onClick={onClose} className='Modal-close'>
            <AiOutlineClose size={12} />
            <p>{closeText}</p>
          </div>}
        </div>
      </div>}
    </>
    
  )
}

const Header = ({children}: any) => children;
Header.displayName = 'Header';
Modal.Header = Header;

const Content = ({children}: any) => children;
Content.displayName = 'Content';
Modal.Content = Content;