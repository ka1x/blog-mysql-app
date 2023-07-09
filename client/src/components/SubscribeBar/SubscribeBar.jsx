import React from 'react';
import './subscribebar.scss';

const SubscribeBar = () => {
   return (
      <div className='sub-bar'>
         <div className='sub-left'>
            <span>
               <span>Subscribe </span> for new stories
            </span>
            <input
               type='text'
               name=''
               placeholder='enter your email'
            />
            <div className='btn-container'>
               <button className='sub-btn'>Subscribe</button>
               <i className='ri-arrow-right-s-line'></i>
            </div>
         </div>
         <div className='sub-right'>
            <div className='social-link'>
               <i className='ri-facebook-fill'></i>
               <span>220k</span>
            </div>{' '}
            <div className='social-link'>
               <i className='ri-twitter-fill'></i>
               <span>66k</span>
            </div>{' '}
            <div className='social-link'>
               <i className='ri-instagram-line'></i>
               <span>20k</span>
            </div>
         </div>
      </div>
   );
};

export default SubscribeBar;
