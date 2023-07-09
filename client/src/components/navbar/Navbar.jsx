import React from 'react';
import {Link} from 'react-router-dom';
import {categories} from '../../data/index.js';
import './navbar.scss';
import SubscribeBar from '../SubscribeBar/SubscribeBar.jsx';

const Navbar = () => {
   return (
      <>
         <nav className='navbar'>
            <SubscribeBar />
            <div className='navbar-content'>
               <div className='logo'>
                  <Link
                     className='logo-link'
                     to={'/'}>
                     BLOG
                  </Link>
               </div>

               <div className='navbar-right'>
                  <div className='navbar-links'>
                     {categories.map((item, i) => (
                        <Link
                           key={i}
                           to={`/?cat=${item.linkname}`}
                           style={{textTransform: 'capitalize'}}>
                           {' '}
                           {item.title}{' '}
                        </Link>
                     ))}
                  </div>

                  <div className='login-links'>
                     <Link
                        className='link'
                        to='/login'>
                        Login
                     </Link>
                     <Link
                        className='link'
                        to='/create'>
                        Create
                     </Link>
                  </div>
               </div>
            </div>
         </nav>
      </>
   );
};

export default Navbar;
