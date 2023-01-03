import React, { useCallback, useEffect } from "react"

export const useClickout = (
  onClickout: (...args: any) => void,
  open: boolean,
  ...refs: React.MutableRefObject<any>[]
) => {
  const clickout = useCallback((e: any) => {
    if (refs && refs.some(r => r?.current?.contains(e.target))) return;
    onClickout();
  }, [onClickout, refs]);
  
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        window.addEventListener('click', clickout);
      }, 300)
    } else {
      window.removeEventListener('click', clickout);
    }
    return () => window.removeEventListener('click', clickout);
  }, [clickout, open]);
}