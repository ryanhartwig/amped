import { useRef } from 'react';
import { useClickout } from '../../utility/hooks/useClickout';
import './Modal.css';

/* React Icons */

interface ModalProps {
  children: React.ReactNode;
  onClose: (...args: any) => void,
  open: boolean,
}

export const Modal = ({children, onClose, open}: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(undefined!);

  useClickout(onClose, contentRef)

  return (
    <div className='Modal noselect'>
      <div className='Modal-content' ref={contentRef}>
        {children}
      </div>
    </div>
  )
}