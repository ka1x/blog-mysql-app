import React from 'react';
import './userbar.scss';

const UserBar = () => {
   return (
      <div className='user'>
         <div>
            <div className='user-pfp'>
               <img
                  src='https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600'
                  alt=''
               />
            </div>
            <div className='name-container'>
               <p>ABRAHAM COLLINS</p>
               <span className='date'> June 21 2023</span>
            </div>
         </div>

         <div className='share'>
            <span>1k shares</span>
            <i className='ri-facebook-fill'></i>
            <i className='ri-twitter-fill'></i>
            <i className='ri-pinterest-fill'></i>
         </div>
      </div>
   );
};

export default UserBar;
