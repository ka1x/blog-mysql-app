import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import './user.scss';
import {Loading, Navbar, Menu, EmptyPageMsg} from '../../components';
import axios from 'axios';
import {getText} from '../../utils/getText';

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

   return (
      <>
         {loading ? (
            <Loading />
         ) : (
            <>
               <Navbar />

               {user ? (
                  <div className='profile-container'>
                     <div className='sidebar'>
                        <h3>Profile</h3>
                        <div className='user-pfp'>
                           <img
                              src={user?.img == null || user?.img == '' ? '/user-circle-svgrepo-com.png' : `/uploads/${user?.img}`}
                              alt=''
                           />
                        </div>
                        <div className='name-container'>
                           <p style={{textTransform: 'uppercase'}}>{` ${user?.firstname} ${user?.lastname}`}</p>
                        </div>
                        {user?.id === currentUser.id && (
                           <>
                              <Link
                                 to={'/options'}
                                 state={user}>
                                 <button className='options-btn'>Options</button>
                              </Link>
                           </>
                        )}
                     </div>

                     <div className='user-content'>
                        {userPosts != 0 ? (
                           <>
                              <h3 className='page-title'> Latest posts </h3>

                              <div className='posts'>
                                 {userPosts?.map((post, i) => (
                                    <Link
                                       to={`/post/${post.id}`}
                                       className='post'
                                       key={i}>
                                       <div className='img'>
                                          <img
                                             src={post.img ? `/uploads/${post.img}` : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
                                             alt=''
                                          />
                                       </div>
                                       <div className='content'>
                                          <div className='text'>
                                             <h3>{post?.title}</h3>
                                             <p className='desc'>{getText(post?.desc, 30)}</p>
                                          </div>
                                       </div>
                                    </Link>
                                 ))}
                              </div>
                           </>
                        ) : (
                           <>
                              <EmptyPageMsg message={'User has not posted any content'} />
                           </>
                        )}
                     </div>
                  </div>
               ) : (
                  <>
                     <EmptyPageMsg message={'Could not find such user'} />
                  </>
               )}
            </>
         )}
      </>
   );
};

export default User;
