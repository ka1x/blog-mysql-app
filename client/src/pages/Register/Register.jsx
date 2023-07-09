import React, {useState} from 'react';
import '../Login/login.scss';
import {Link} from 'react-router-dom';
import axios from 'axios'

const Register = () => {

  //states//
   const [inputs, setInputs] = useState({
      username: '',
      email: '',
      password: '',
   });
   const [err, setError] = useState(null);

   //event handlers//
   const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
         const res = await axios.post('/auth/register', inputs)
         console.log(res)
  
      } catch (error) {
         console.log(error)
      }

   };

   const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   return (
      <div>
         <div className='login-page-container'>
            <div className='form-container'>
               <>
                  <form
                     onSubmit={handleSubmit}
                     className='login-form'>
                     <h3>Register</h3>
                     <input
                        required
                        type='text'
                        placeholder='username'
                        name='username'
                        onChange={handleChange}
                     />
                     <input
                        required
                        type='email'
                        placeholder='email'
                        name='email'
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
                        Already have an account?
                        <span className='login-link'>
                           {' '}
                           <Link to='/login'> Log in</Link>
                        </span>
                     </span>
                     <input
                        type='submit'
                        className='button form-btn'
                        value={'Sign up'}></input>
                          {err && <p>{err}</p>}
                  </form>
               </>
            </div>
         </div>
      </div>
   );
};

export default Register;
