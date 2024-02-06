import React from 'react';
import './empty.scss';
const EmptyPageMsg = ({message}) => {
   return (
      <div className='alert-container'>
         <h2 className='empty-alert'>{message}</h2>
      </div>
   );
};

export default EmptyPageMsg;
