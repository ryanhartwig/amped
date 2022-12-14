import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export type Location = 'dash' | 'routines' | 'train' | 'finished' | 'profile';

export const useView = () => {
  const location = useLocation();
  
  const [route, setRoute] = useState<Location>('dash');

  useEffect(() => {
    const split = location.pathname.split('/');
    const homeInd = split.findIndex(p => p === 'home');
    setRoute(split[homeInd + 1] as Location);
  }, [location.pathname]);

  return { route };
}