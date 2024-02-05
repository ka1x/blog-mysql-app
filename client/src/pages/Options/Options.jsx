import {useAuth} from '../../context/AuthContext';
import './options.scss';
import '../Login/login.scss';
import React, {useState} from 'react';
import {AlertPopup, FileInput, GoBack} from '../../components';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Options = () => {
   const {currentUser} = useAuth();
   const [inputs, setInputs] = useState({
      oldPass: '',
      newPass: '',
   });
   const [file, setFile] = useState(null);
   const state = useLocation().state;
   const navigate = useNavigate();
   const {logout} = useAuth();

   const [showAlert, setShowAlert] = useState(false);

   const handleChange = (e) => {
      setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
   };

   //password change//
   const handlePasswordSubmit = async (e) => {
      e.preventDefault();

      try {
         console.log(inputs);
      } catch (error) {
         setError(error.response.data);
      }
   };

   // profile picture submission //
   const handleImageSubmit = async (e) => {
      e.preventDefault();

      try {
         console.log(file);
      } catch (error) {
         setError(error.response.data);
      }
   };

   const handleNavigate = async () => {
      navigate(`/user/${currentUser.id}`);
   };

   // user deletion //
   const handleConfirm = () => {
      setShowAlert(false);
      handleUserDelete();
   };
   const handleCancel = () => {
      setShowAlert(false);
   };
   const handleUserDelete = async () => {
      try {
         await axios.delete(`/user/${currentUser.id}`);
         await logout();
         navigate('/');
      } catch (err) {
         console.log(err);
      }
   };



   return (
      <>
         <div className='options-page-container'>
         <GoBack/>
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
               <div className='form'>
                  <h4>Account Deletion</h4>
                  <button onClick={() => setShowAlert(true)}> Delete Account</button>
               </div>
            </div>
            {showAlert && (
               <AlertPopup
                  message='Are you sure you want to delete your account?'
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                  showCancel={true}
               />
            )}
         </div>
      </>
   );
};

export default Options;
