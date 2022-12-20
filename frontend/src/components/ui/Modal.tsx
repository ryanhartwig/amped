import { useRef } from 'react';
import { useClickout } from '../../utility/hooks/useClickout';
import './Modal.css';

/* React Icons */

interface ModalProps {
  children: React.ReactNode;
  onClose: (...args: any) => void,
  open: boolean,
  triggerRef: React.MutableRefObject<any>,
}

export const Modal = ({children, onClose, open, triggerRef}: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(undefined!);

  useClickout(onClose, contentRef, triggerRef)



  return (
    <>
      {open && <div className='Modal noselect'>
        <div className='Modal-content' ref={contentRef}>
          {children}
        </div>
      </div>}
    </>
    
  )
}