import React, {useState} from 'react';
import './alertpopup.scss';

const AlertPopup = ({message, onConfirm, onCancel, isVisible}) => {
   return (
		
      <div className='popup'>
			<div className="overlay"></div>
         <div className='popup-content'>
            <p>{message}</p>
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
         </div>
      </div>
   );
};
export default AlertPopup;
