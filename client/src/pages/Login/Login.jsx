import React, {useState} from 'react';
import './login.scss'

const Login = () => {
   //event handlers//
   const handleSubmit = (e) => {
      e.preventDefault();
   };

   const handleChange = (e) => {};

   return (
      <div>
         <div className='login-page-container'>
            <div className='form-container'>
               <>
                  <form
                     onSubmit={handleSubmit}
                     className='login-form'>
                     <h3> 'Login'</h3>

                     <input
                        required
                        type='text'
                        placeholder='username'
                        name='username'
                        onChange={handleChange}
                     />
                     <input
                        required
                        type='password'
                        placeholder='password'
                        name='password'
                        onChange={handleChange}
                     />

                     <span>
                        Don't have an account?
                        <span className='login-link'>Sign up</span>
                     </span>
                     <input
                        type='submit'
                        className='button form-btn'
                        value={'Login'}></input>
                  </form>
               </>
            </div>
         </div>
      </div>
   );
};

export default Login;
