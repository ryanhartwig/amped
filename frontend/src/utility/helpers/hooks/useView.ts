import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export type Location = 'dash' | 'routines' | 'train' | 'finished' | 'profile';

export const useView = () => {
  const location = useLocation();
  
  const [route, setRoute] = useState<string[]>(location.pathname.split('/'));

  useEffect(() => {
    const split = location.pathname.split('/');
    setRoute(split);
  }, [location.pathname]);

  return route;
}