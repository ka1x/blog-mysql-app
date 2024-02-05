import {useState} from 'react';
import {Routes, Route, Outlet} from 'react-router-dom';
import {Create, Home, Login, Post, Register, User, Options} from './pages';

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
            <Route
               path='/options'
               element={<Options />}
            />
         </Routes>
      </div>
   );
}

export default App;
