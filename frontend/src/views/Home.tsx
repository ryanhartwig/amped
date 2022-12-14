import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '../components/navigation/BottomNav';
import { HeaderNav } from '../components/navigation/HeaderNav';
import './Home.css';

// interface HomeProps {

// }

export const Home = () => {
  const location = useLocation();


  return (
    <div className='Home'>
      {/* Top navigation bar */}
      <HeaderNav />

      {/* All sub-routes / views */}
      <div className='Outlet'>
        sddsdsd
        <Outlet />
      </div>
      
      {/* Bottom (mobile) navigation bar */}
      <BottomNav />
    </div>
  )
}