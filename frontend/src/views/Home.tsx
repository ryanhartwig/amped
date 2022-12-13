import { Outlet } from 'react-router-dom';
import { BottomNav } from '../components/navigation/BottomNav';
import { HeaderNav } from '../components/navigation/HeaderNav';
import './Home.css';

// interface HomeProps {

// }

export const Home = () => {



  return (
    <div className='Home'>
      {/* Top navigation bar */}
      <HeaderNav />

      {/* All sub-routes / views */}
      <div className='Outlet'>
        <Outlet />
      </div>
      
      {/* Bottom (mobile) navigation bar */}
      <BottomNav />
    </div>
  )
}