import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home/dash");
  }, [navigate]);

  return <></>
}