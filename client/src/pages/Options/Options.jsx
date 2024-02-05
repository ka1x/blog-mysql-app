import {useAuth} from '../../context/AuthContext';
import './options.scss';
import '../Login/login.scss';
import React, {useState} from 'react';
import {FileInput} from '../../components';
import {useLocation} from 'react-router-dom';

const Options = () => {
   const {currentUser} = useAuth();
   const [inputs, setInputs] = useState({
      oldPass: '',
      newPass: '',
   });
   const [file, setFile] = useState(null);
   const state = useLocation().state;

   const handleChange = (e) => {
      setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
   };

   const handlePasswordSubmit = async (e) => {
      e.preventDefault();

      try {
         console.log(inputs);
      } catch (error) {
         setError(error.response.data);
      }
   };

   const handleImageSubmit = async (e) => {
      e.preventDefault();

      try {
         console.log(file);
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
                  <input
                     type='submit'
                     value='Submit'
                     className='form-btn'
                  />
               </form>
               <br />
               <form
                  onSubmit={handleImageSubmit}
                  className='form'>
                  <h4>Upload Profile Picture</h4>

                  <FileInput
                     state={state}
                     file={file}
                     setFile={setFile}></FileInput>
                  <input
                     type='submit'
                     className='form-btn'
                  />
               </form>
               <br />
               <form className='form'>
                  <h4>Account Deletion</h4>
                  <button> Delete Account</button>
               </form>
            </div>
         </div>
      </>
   );
};

export default Options;
