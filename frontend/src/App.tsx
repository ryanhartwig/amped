import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './views/Login';
import { Home } from './views/Home';
import { Dash } from './views/sub/Dash';
import { NotFound } from './views/NotFound';
import { Routines } from './views/sub/Routines';
import { Train } from './views/sub/Train';
import { Completed } from './views/sub/Completed';
import { Profile } from './views/sub/Profile';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="home" element={<Home />}>
            <Route path="dash" element={<Dash />} />
            <Route path="routines" element={<Routines />} />
            <Route path="train" element={<Train />} />
            <Route path="finished" element={<Completed />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
