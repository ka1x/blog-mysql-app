import {useAuth} from '../../context/AuthContext';
import './options.scss';
import '../Login/login.scss';
import React, {useState} from 'react';
import {AlertPopup, FileInput} from '../../components';
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
   const [error, setError] = useState(null);

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

   const upload = async () => {
      try {
         const formData = new FormData();
         formData.append('file', file);
         const res = await axios.post('/upload', formData);
         return res.data;
      } catch (error) {
         console.log(error);
      }
   };

   const handleImageSubmit = async (e) => {
      e.preventDefault();
      const image = await upload();
      try {
         await axios.put(`/user/${state.id}/photo`, {
            img: file ? image : `${state?.img}`,
         });
         navigate(`/user/${currentUser.id}`);
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
      } catch (error) {
         console.log(error);
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
                  {error && <p className='error'>{error}</p>}
               </form>
               <br />

               <div className='form'>
                  <h4>Upload Profile Picture</h4>

                  <FileInput
                     state={state}
                     file={file}
                     setFile={setFile}></FileInput>
                  <button onClick={handleImageSubmit}>Submit</button>
               </div>
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
