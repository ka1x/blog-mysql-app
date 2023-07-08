import React, {useState} from 'react';
import './login.scss';
import {Link} from 'react-router-dom';

const Login = () => {
   //states//
   const [inputs, setInputs] = useState({
      username: '',
      password: '',
   });
   const [err, setError] = useState(null);

   //event handlers//
   const handleSubmit = (e) => {
      e.preventDefault();
   };

   const handleChange = (e) => {
      setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
   };

   return (
      <div>
         <div className='login-page-container'>
            <div className='form-container'>
               <>
                  <form
                     onSubmit={handleSubmit}
                     className='login-form'>
                     <h3> Login</h3>

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
                        <span className='login-link'>
                           {' '}
                           <Link to='/register'> Sign up</Link>
                        </span>
                     </span>
                     <input
                        type='submit'
                        className='button form-btn'
                        value={'Login'}></input>
                     {err && <p>{err}</p>}
                  </form>
               </>
            </div>
         </div>
      </div>
   );
};

export default Login;
