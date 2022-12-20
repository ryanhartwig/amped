import { useCallback, useEffect } from "react"

export const useClickout = (
  onClickout: (...args: any) => void,
  ...refs: React.MutableRefObject<any>[]
) => {
  const clickout = useCallback((e: any) => {
    if (refs && refs.some(r => r?.current?.contains(e.target))) return;

    onClickout();
  }, [onClickout, refs]);
  
  useEffect(() => {
    window.addEventListener('click', clickout);
    return () => window.removeEventListener('click', clickout);
  }, [clickout]);
}