// AuthContextProvider.js

import {useEffect, useState, useContext} from 'react';
import {createContext} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
   const initialCurrentUser = Cookies.get('user');
   const initialAccessToken = Cookies.get('access_token');

   const [currentUser, setCurrentUser] = useState(initialCurrentUser ? JSON.parse(initialCurrentUser) : null);
   const [accessToken, setAccessToken] = useState(initialAccessToken ? initialAccessToken : null);

   const login = async (inputs) => {
      try {
         const res = await axios.post('/auth/login', inputs);

         // Assuming the server sends both user data and access token in the response
         const {access_token, ...userData} = res.data;

         // Store user data in cookies
         Cookies.set('user', JSON.stringify(userData));
         // Store access token in cookies
         Cookies.set('access_token', access_token, {
            httpOnly: true,
            sameSite: 'none', // Allow cross-site access, requires secure connection (HTTPS)
            secure: true,
         });

         // Update state with user data and access token
         setCurrentUser(userData);
         setAccessToken(access_token);
      } catch (error) {
         console.error('Error during login:', error);
         // Handle the error, e.g., show a message to the user
      }
   };

   const logout = async () => {
      try {
         await axios.post('/auth/logout');
         // Clear user data and access token from state and cookies
         setCurrentUser(null);
         setAccessToken(null);
         Cookies.remove('user');
         Cookies.remove('access_token');
      } catch (error) {
         console.error('Error during logout:', error);
         // Handle the error, e.g., show a message to the user
      }
   };

   useEffect(() => {
      if (currentUser) {
         Cookies.set('user', JSON.stringify(currentUser)); // Set the user data in a cookie
      } else {
         Cookies.remove('user'); // Remove the cookie if currentUser is null
      }
   }, [currentUser]);

   return <AuthContext.Provider value={{currentUser, accessToken, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   return useContext(AuthContext);
};
