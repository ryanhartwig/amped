import './Home.css';

import { Outlet, useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/navigation/BottomNav';
import { HeaderNav } from '../components/navigation/HeaderNav';
import { useView } from '../utility/hooks/useView';

/* React icons */
import { AiOutlineLeft } from 'react-icons/ai';
import { useCallback } from 'react';


export const Home = () => {
  const navigate = useNavigate();

  const { route } = useView();

  const onGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className='Home'>
      {/* Top navigation bar */}
      <HeaderNav />

      {/* All sub-routes / views */}
      <div className='Outlet'>

        {route !== 'dash' && 
        <div className='Home-goback noselect' onClick={onGoBack}>
          <AiOutlineLeft />
          <p>Back</p>
        </div>}

        <div className='Home-app' style={{height: route !== 'dash' ? 'calc(100% - 34px)' : ''}}>
          <Outlet />

        </div>
      </div>
      
      {/* Bottom (mobile) navigation bar */}
      <BottomNav />
    </div>
  )
}