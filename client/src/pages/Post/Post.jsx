import React, {useEffect, useState} from 'react';
import {Footer, Navbar, Menu, UserBar} from '../../components';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import './post.scss';
import {useAuth} from '../../context/AuthContext';
import axios from 'axios';
const Post = () => {
   const [post, setPost] = useState({});

   const location = useLocation();
   const postId = location.pathname.split('/')[2];

   const navigate = useNavigate();
   const {currentUser} = useAuth();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await axios.get(`/posts/${postId}`);
            setPost(res.data);
         } catch (err) {
            console.log(err);
         }
      };
      fetchData();
   }, [postId]);

   //event handlers//
   const handleDelete = async () => {
      try {
         await axios.delete(`/posts/${postId}`);
         navigate('/');
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <>
         <Navbar></Navbar>
         <div className='post-container'>
            <div className='content'>
               <h1>{post.title}</h1>
               {currentUser ? (
                  <>
                     <div className='edit'>
                        <Link to={`/write?edit=2`}>
                           <i className='ri-edit-line'></i>
                        </Link>
                        <i
                           className='ri-delete-bin-6-line'
                           onClick={handleDelete}></i>
                     </div>{' '}
                  </>
               ) : (
                  <></>
               )}
               <UserBar data={post}></UserBar>

               <div className='img-container'>
                  <img
                     className='post-img'
                     src={post?.img}
                     alt=''
                  />
               </div>
               <p>{post?.desc}</p>
            </div>
            <Menu cat={post?.cat} />
         </div>
         {/* <Footer></Footer> */}
      </>
   );
};

export default Post;
