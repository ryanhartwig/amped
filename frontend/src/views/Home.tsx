import './Home.css';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/navigation/BottomNav';
import { HeaderNav } from '../components/navigation/HeaderNav';
import { useView } from '../utility/helpers/hooks/useView';

/* React icons */
import { AiOutlineLeft } from 'react-icons/ai';
import { useCallback, useMemo } from 'react';


export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cancel = ['add-rt', 'add-ex'].some(str => location.pathname.includes(str));

  const route = useView();

  const back = useMemo(() => {
    return !['dash', 'routines', 'train', 'finished', 'profile'].includes(route[route.length - 1]);
  }, [route]);
  
  const onGoBack = useCallback(() => {
    if (cancel) {
      navigate('/home/routines', { state: {}});
    } else {
      navigate(-1);
    }
  }, [cancel, navigate]);


  return (
    <div className='Home'>
      {/* Top navigation bar */}
      <HeaderNav />

      {/* All sub-routes / views */}
      <div className='Outlet'>

        {back && <div className='Home-goback noselect' onClick={onGoBack}>
          <AiOutlineLeft size={11} />
          <p>{cancel ? 'Cancel' : 'Back'}</p>
        </div>}

        <div className='Home-app' style={{height: back ? 'calc(100% - 34px)' : ''}}>
          <Outlet />
        </div>
      </div>
      
      {/* Bottom (mobile) navigation bar */}
      {!cancel && <BottomNav />}
    </div>
  )
}