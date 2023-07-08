import {useState} from 'react';
import {Routes, Route, Outlet} from 'react-router-dom';
import {Create, Home, Login, Post} from './pages';

function App() {
   return (
      <>
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
            />    <Route
               path='/login'
               element={<Login />}
            />
         </Routes>
      </>
   );
}

export default App;
