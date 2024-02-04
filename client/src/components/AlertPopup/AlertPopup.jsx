import React from 'react';
import './alertpopup.scss';

const AlertPopup = ({message, onConfirm, onCancel, showCancel}) => {
   console.log(showCancel);

   return (
      <div className='popup'>
         <div className='overlay'></div>
         <div className='popup-content'>
            <p>{message}</p>
            <button onClick={onConfirm}>Confirm</button>
            {showCancel == true && <button onClick={onCancel}>Cancel</button>}
         </div>
      </div>
   );
};
export default AlertPopup;
