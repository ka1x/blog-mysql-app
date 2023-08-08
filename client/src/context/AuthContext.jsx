import {useEffect, useState, useContext} from 'react';
import {createContext} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
   const initialCurrentUser = Cookies.get('user');
   const [currentUser, setCurrentUser] = useState(initialCurrentUser ? JSON.parse(initialCurrentUser) : null);

   // useEffect(() => {
   //    console.log(currentUser);
   // }, [currentUser]);

   const login = async (inputs) => {
      const res = await axios.post('/auth/login', inputs);
      setCurrentUser(res.data);
   };

   const logout = async () => {
      await axios.post('/auth/logout');
      setCurrentUser(null);
   };

   useEffect(() => {
      if (currentUser) {
         Cookies.set('user', JSON.stringify(currentUser)); // Set the user data in a cookie
      } else {
         Cookies.remove('user'); // Remove the cookie if currentUser is null
      }
   }, [currentUser]);

   return <AuthContext.Provider value={{currentUser, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   return useContext(AuthContext);
};
