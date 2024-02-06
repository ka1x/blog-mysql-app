import React, {useState, useEffect} from 'react';
import './popupmessage.scss';

const PopupMessage = ({message, isVisible}) => {

 

   return (
      <div className={`popup ${isVisible ? 'popup-visible' : ''}`}>
         <p>{message}</p>
      </div>
   );
};

export default PopupMessage;
