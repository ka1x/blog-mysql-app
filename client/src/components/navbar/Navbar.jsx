import React from 'react';
import {Link} from 'react-router-dom';
import {categories} from '../../data/index.js';
import './navbar.scss';

const Navbar = () => {
   return (
      <nav className='navbar'>
         <div className='logo'>
            <Link to={'/'}>LOGO</Link>
         </div>

         <div className='navbar-right'>
            <div className='navbar-links'>
               {categories.map((item, i) => (
                  <Link
                     key={i}
                     to={`/?cat=${item.linkname}`}
                     style={{textTransform: 'uppercase'}}>
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
      </nav>
   );
};

export default Navbar;
