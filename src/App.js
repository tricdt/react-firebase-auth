import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Account from './components/Auth/Account';


function App() {
  return (
    <div className="App">
      <h1 className='text-center text-4xl font-bold'>
        Firebase Auth & Context
      </h1>
      <Routes>
        <Route path='/login' element={<Signin />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/account'
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;
