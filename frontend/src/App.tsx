import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './views/Login';
import { Home } from './views/Home';
import { Dash } from './views/sub/Dash';
import { NotFound } from './views/NotFound';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="home" element={<Home />}>
            <Route path="dash" element={<Dash />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
