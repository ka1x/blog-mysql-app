import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {categories} from '../../data/index.js';
import './navbar.scss';
import SubscribeBar from '../SubscribeBar/SubscribeBar.jsx';
import {useAuth} from '../../context/AuthContext.jsx';

const Navbar = () => {
   const {currentUser} = useAuth();
   const {logout} = useAuth();

   const [openMenu, setOpenMenu] = useState(false);

   const handleLogout = async () => {
      try {
         await logout();
      } catch (error) {
         setError(error.response.data);
      }
   };

   return (
      <>
         <nav className='navbar'>
            <SubscribeBar />
            <div className='navbar-content'>
               <div className='navbar-left'>
                  <div className='logo'>
                     <Link
                        className='logo-link'
                        to={'/'}>
                        BLOG
                     </Link>
                  </div>

                  <div className={openMenu ? 'navbar-links open' : 'navbar-links'}>
                     <div
                        className='links-close'
                        onClick={() => setOpenMenu(false)}>
                        <i className='ri-close-line'></i>
                     </div>
                     {categories.map((item, i) => (
                        <Link
                           key={i}
                           to={`/?cat=${item.linkname}`}
                           style={{textTransform: 'capitalize'}}
                           onClick={() => setOpenMenu(false)}>
                           {item.title}
                        </Link>
                     ))}
                  </div>
               </div>

               <div className='navbar-right'>
                  {/* {!openMenu && ( */}
                     <img
                        src='/menu-svgrepo-com.png'
                        alt='Menu Categories'
                        className={`menu-mobile ${openMenu ? 'hidden-menu' : ''}`}
                        onClick={() => setOpenMenu(true)}
                        style={{height: 22, width: 22}}
                     />
                  {/* )} */}
                  {currentUser ? (
                     <>
                        <div>
                           <Link
                              className='link'
                              to='/create'
                              style={{marginRight: 10}}>
                              <i className='i-loggedin ri-pen-nib-line'></i>
                           </Link>
                           <Link
                              className='link'
                              to={`/user/${currentUser.id}`}>
                              {/* Create */}
                              <i className='i-loggedin ri-user-3-line'></i>
                           </Link>
                        </div>

                        <Link
                           className='link'
                           to='/'
                           onClick={logout}>
                           Logout
                        </Link>
                     </>
                  ) : (
                     <>
                        <Link
                           className='link login-link'
                           to='/login'>
                           <i className='ri-user-3-line'></i>
                           Login
                        </Link>
                     </>
                  )}
               </div>
            </div>
         </nav>
      </>
   );
};

export default Navbar;
