import {useState} from 'react';
import {Routes, Route, Outlet} from 'react-router-dom';
import {Create, Home, Login, Post, Register} from './pages';

function App() {
   return (
      <div className='app'>
         <Routes>
            <Route
               path='/'
               element={<Home />}
            />{' '}
            <Route
               path='/post/:id'
               element={<Post />}
            />
            <Route
               path='/create'
               element={<Create />}
            />{' '}
            <Route
               path='/login'
               element={<Login />}
            />{' '}
            <Route
               path='/register'
               element={<Register />}
            />
         </Routes>
      </div>
   );
}

export default App;
