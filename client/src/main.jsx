import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import {AuthContextProvider} from './context/AuthContext';

axios.defaults.baseURL = 'https://mysql-server.up.railway.app/api/';
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <BrowserRouter>
         <AuthContextProvider>
            <App />
         </AuthContextProvider>
      </BrowserRouter>
   </React.StrictMode>
);
