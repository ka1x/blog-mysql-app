import React from 'react';
import './userbar.scss';
import {parseISO, format} from 'date-fns';

const UserBar = ({data}) => {
  
   
   const renderDate = () => {
      if (data.date) {
         const sqlDatetime = data?.date;
         // Extract year, month, and day from ISO datetime string
         const year = parseInt(sqlDatetime.substring(0, 4), 10);
         const month = parseInt(sqlDatetime.substring(5, 7), 10) - 1; // Month is 0-indexed
         const day = parseInt(sqlDatetime.substring(8, 10), 10);

         // Create a JavaScript Date object
         const jsDate = new Date(year, month, day);

         // Format the date as "Month Day Year" (e.g., "June 21 2023")
         const formattedDate = format(jsDate, 'MMMM d yyyy');

         return <span className='date'> {formattedDate}</span>;
      }
   };

   return (
      <div className='user'>
         <div>
            <div className='user-pfp'>
               <img
                  src={data?.userImg}
                  alt=''
               />
            </div>
            <div className='name-container'>
               <p style={{textTransform: 'uppercase'}}>
                  {' '}
                  {data?.firstname} {data?.lastname}{' '}
               </p>
               {/* <span className='date'> {data.date ? `${formattedDate}` : 'June 21 2023'}</span> */}
               {/* <span className='date'> {formattedDate}</span> */}
               {renderDate()}
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
