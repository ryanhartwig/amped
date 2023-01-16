import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './views/Login';
import { Home } from './views/Home';
import { Dash } from './views/sub/Dash';
import { NotFound } from './views/NotFound';
import { Routines } from './views/sub/Routines';
import { Train } from './views/sub/train/Train';
import { Completed } from './views/sub/Completed';
import { Profile } from './views/sub/Profile';
import { useAppSelector } from './utility/helpers/hooks';
import { AddExercise } from './views/sub/AddExercise';
import { AddRoutine } from './views/sub/AddRoutine';
import { Overview } from './views/sub/train/Overview';
import { Session } from './views/sub/train/Session';
import { GetAuth } from './views/GetAuth';

function App() {

  const { background } = useAppSelector(s => s.theme);

  return (
    <div className='App' style={{background}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GetAuth />}>
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />}>
              <Route path="dash" element={<Dash />} />
              <Route path="routines" element={<Routines />} />
              <Route path="routines/add-rt" element={<AddRoutine />} />
              <Route path="routines/add-ex" element={<AddExercise />} />
              <Route path="train" element={<Train />} />
              <Route path="train/overview" element={<Overview />} />
              <Route path="finished" element={<Completed />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="session" element={<Session />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
