import React, {useState} from 'react';
import '../Login/login.scss';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
   //states//
   const [inputs, setInputs] = useState({
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
   });
   const [err, setError] = useState(null);
   const navigate = useNavigate();

   //event handlers//
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         await axios.post('/auth/register', inputs);
         navigate('/login');
      } catch (error) {
         setError(error.response.data);
      }
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
                     <h3>Register</h3>
                     <input
                        required
                        type='text'
                        placeholder='Username'
                        name='username'
                        onChange={handleChange}
                     />{' '}
                     <input
                        required
                        type='text'
                        placeholder='First Name'
                        name='firstname'
                        onChange={handleChange}
                     />{' '}
                     <input
                        required
                        type='text'
                        placeholder='Last Name'
                        name='lastname'
                        onChange={handleChange}
                     />
                     <input
                        required
                        type='email'
                        placeholder='Email'
                        name='email'
                        onChange={handleChange}
                     />
                     <input
                        required
                        type='password'
                        placeholder='Password'
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
                     {err && <p className='error'>{err}</p>}
                  </form>
               </>
            </div>
         </div>
      </div>
   );
};

export default Register;
