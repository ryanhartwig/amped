// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";

export const useToggleSet = (
  setState: Set<any>,
  setStateSetter: React.Dispatch<React.SetStateAction<Set<any>>>,
) => {
  return useCallback((t: string) => {
    const newSet = new Set(setState);
    setState.has(t) 
      ? newSet.delete(t)
      : newSet.add(t);
    setStateSetter(newSet);
  }, [setState, setStateSetter]);
}