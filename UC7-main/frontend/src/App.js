import React from 'react';
import './App.css';
import './Reset-css/reset.scss'
import Rotas from './Routes';
import { ToastContainer } from 'react-toastify'
import AuthProvider from './Contexts/authContexts';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <div>
        <Rotas/>
        <ToastContainer autoClose={5000} />
      </div>
    </AuthProvider>
  );
}

export default App;