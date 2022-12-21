
import React from 'react';
import { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppSelector } from '../../utility/hooks';
import { useClickout } from '../../utility/hooks/useClickout';
import './Modal.css';

/* React Icons */

interface ModalProps {
  children: React.ReactNode;
  onClose: (...args: any) => void,
  open: boolean,
  triggerRef: React.MutableRefObject<any>,
  closeText?: string;
}

export const Modal = ({children, onClose, open, triggerRef, closeText}: ModalProps) => {
  const header = React.Children.map(children, (child: any) => child?.type?.displayName === 'Header' ? child : null)
  const content = React.Children.map(children, (child: any) => child?.type?.displayName !== 'Header' ? child : null)

  const { background_alt: background } = useAppSelector(s => s.theme);
  
  const contentRef = useRef<HTMLDivElement>(undefined!);
  useClickout(onClose, contentRef, triggerRef);

  return (
    <>
      {open && <div className='Modal noselect'>
        
        <div className='Modal-box' ref={contentRef} style={{background}}>
          {header && <div className='Modal-header'>
            <h2>{header}</h2>
            <hr></hr>
          </div>}
          <div className='Modal-content'>
            {content}
          </div>
          {closeText && 
          <div onClick={onClose} className='Modal-close'>
            <AiOutlineClose size={14} />
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