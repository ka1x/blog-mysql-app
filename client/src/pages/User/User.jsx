import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import './user.scss';
import {Loading, Navbar,Menu} from '../../components';
import axios from 'axios';

const User = () => {
   const [loading, setLoading] = useState(true);
   const {currentUser} = useAuth();

   const [user, setUser] = useState(null);
   const [userPosts, setUserPosts] = useState(null);

   const location = useLocation();
   const profileId = location.pathname.split('/')[2];

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await axios.get(`/user/${profileId}`);
            setUser(res.data);
         } catch (err) {
            console.log(err);
         }
      };

      const fetchPosts = async () => {
         try {
            const res = await axios.get(`/user/${profileId}/posts`);
            setUserPosts(res.data);
         } catch (err) {
            console.log(err);
         }
      };

      fetchData();
      fetchPosts();

      setLoading(false);
   }, [profileId]);

   useEffect(() => {
      console.log(user);
   }, [user]);

   return (
      <>
         {loading ? (
            <Loading />
         ) : (
            <>
               <Navbar />

               <div className='profile-container'>
                  <div className='sidebar'>
                     <h3>Profile</h3>
                     <div className='user-pfp'>
                        <img
                           src={user?.img ? user?.img : '/user-circle-svgrepo-com.png'}
                           alt=''
                        />
                     </div>
                     <div className='name-container'>
                        <p style={{textTransform: 'uppercase'}}>{` ${user?.firstname} ${user?.lastname}`}</p>
                     </div>
                  </div>

                  <div className='content'>
                     <Menu></Menu>
                  </div>
               </div>
            </>
         )}
      </>
   );
};

export default User;
