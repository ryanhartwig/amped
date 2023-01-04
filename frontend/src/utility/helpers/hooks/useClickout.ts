import React, { useCallback, useEffect } from "react"

export const useClickout = (
  onClickout: (...args: any) => void,
  open: boolean,
  ...refs: React.MutableRefObject<any>[]
) => {

  const clickout = useCallback((e: any) => {
    if (refs && refs.some(r => r?.current?.contains(e.target))) return;
    window.removeEventListener('click', clickout);
    onClickout();
  }, [onClickout, refs]);
  
  useEffect(() => {
    window.removeEventListener('click', clickout);
    window.removeEventListener('click', clickout);
    window.removeEventListener('click', clickout);

    setTimeout(() => {
      window.addEventListener('click', clickout);
    }, 300)

    return () => window.removeEventListener('click', clickout);
  }, [clickout]);
}