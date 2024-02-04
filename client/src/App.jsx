import {useState} from 'react';
import {Routes, Route, Outlet} from 'react-router-dom';
import {Create, Home, Login, Post, Register, User} from './pages';

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
            <Route
               path='/user/:id'
               element={<User />}
            />
         </Routes>
      </div>
   );
}

export default App;
