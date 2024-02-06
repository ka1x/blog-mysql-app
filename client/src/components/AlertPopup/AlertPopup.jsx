import React from 'react';
import './alertpopup.scss';

const AlertPopup = ({message, onConfirm, onCancel, showCancel}) => {
   return (
      <div className='confirm-popup'>
         <div className='overlay'></div>
         <div className='popup-content'>
            <p>{message}</p>
            <div>
               <button onClick={onConfirm}>Confirm</button>
               {showCancel == true && <button onClick={onCancel}>Cancel</button>}
            </div>
         </div>
      </div>
   );
};
export default AlertPopup;
