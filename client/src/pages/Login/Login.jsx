import React, {useState} from 'react';
import './login.scss';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

const Login = () => {
   //states//
   const [inputs, setInputs] = useState({
      username: '',
      password: '',
   });
   const [err, setError] = useState(null);
   const navigate = useNavigate();

   //context//
   const {login} = useAuth();

   //event handlers//
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         await login(inputs);
         navigate('/');
      } catch (error) {
         setError(error.response.data);
      }
   };

   const handleChange = (e) => {
      setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
   };

   //html//
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
                        placeholder='Username'
                        name='username'
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
                     {err && <p className='error'>{err}</p>}
                  </form>
               </>
            </div>
         </div>
      </div>
   );
};

export default Login;
