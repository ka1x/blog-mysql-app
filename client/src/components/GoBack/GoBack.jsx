import React from 'react';
import './goback.scss';
import {useNavigate} from 'react-router-dom';


const GoBack = () => {
	const navigate = useNavigate();
	// navigation//
const handleGoBack = () => {
   navigate(-1); // This will navigate back one step in the history stack
};
   return (
      <i
         className='ri-arrow-left-line go-back'
         onClick={handleGoBack}></i>
   );
};

export default GoBack;
