import logo from './logo.svg';
import 'antd/dist/antd.min.css'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Account from './components/Auth/Account';
import AuthProvider from './context/AuthContext';

import { Spin, Button } from 'antd';
import Admin from './components/Auth/Admin';
import Manager from './components/Auth/Manager';
import User from './components/Auth/User';
import Home from './components/Auth/Home';
import PrivateRoute from './components/Auth/PrivateRoute';
import Private from './components/Private';
function App() {
  return (
    <div className="App">
      <h1 className='text-center text-4xl font-bold'>
        Firebase Auth & Context
      </h1>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Signin />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/admin'
            element={
              <PrivateRoute redirectTo='/login'>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route />
          <Route path='/manager'
            element={
              <PrivateRoute redirectTo='/login'>
                <Manager />
              </PrivateRoute>
            }
          />
          <Route path='/user'
            element={
              <PrivateRoute redirectTo='/'>
                <User />
              </PrivateRoute>
            }
          />
          <Route path='/' element={<Home />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
