import {useAuth} from '../../context/AuthContext';
import './options.scss';
import '../Login/login.scss';
import React, {useState} from 'react';

const Options = () => {
   const {currentUser} = useAuth();
   const [inputs, setInputs] = useState({
      oldPass: '',
      newPass: '',
   });

   const handleChange = (e) => {
      setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
   };

   const handlePasswordSubmit = async (e) => {
      e.preventDefault();

      try {
			console.log(inputs)
			
      } catch (error) {
         setError(error.response.data);
      }
   };
   return (
      <>
         <div className='options-page-container'>
            <div className='form-container'>
               <h3>Options</h3>

               <form
                  className='form'
                  onSubmit={handlePasswordSubmit}>
                  <h4>Update password</h4>
                  <input
                     type='password'
                     name='oldPass'
                     placeholder='Old password'
                     className='old-pass'
                     onChange={handleChange}
                  />
                  <input
                     type='password'
                     name='newPass'
                     placeholder='New password'
                     className='new-pass'
                     onChange={handleChange}
                  />
						<input type="submit" value="Submit" className='form-btn' />
               </form>
            </div>
         </div>
      </>
   );
};

export default Options;
