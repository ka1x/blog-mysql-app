import React, {useEffect, useState} from 'react';
import {Footer, Navbar, Menu, UserBar, AlertPopup} from '../../components';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import './post.scss';
import {useAuth} from '../../context/AuthContext';
import axios from 'axios';
import DOMPurify from 'dompurify';

const Post = () => {
   const [post, setPost] = useState({});

   const location = useLocation();
   const postId = location.pathname.split('/')[2];

   const navigate = useNavigate();
   const {currentUser} = useAuth();

   const [showAlert, setShowAlert] = useState(false);

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

   const handleCancel = () => {
      setShowAlert(false);
   };
   const handleConfirm = () => {
      setShowAlert(false);
      handleDelete();
   };

   //event handlers//
   const handleDelete = async () => {
      // Display a confirmation dialog
      // const isConfirmed = window.confirm('Are you sure you want to delete this post?');

      // If the user confirms, proceed with the deletion
      // if (isConfirmed) {
      try {
         await axios.delete(`/posts/${postId}`);
         navigate('/');
      } catch (err) {
         console.log(err);
      }
      // }
   };

   const getText = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent;
   };

   return (
      <>
         <Navbar></Navbar>
         <div className='post-container'>
            <div className='content'>
               <h1>{post.title}</h1>

               <UserBar data={post}></UserBar>

               {post.img ? (
                  <div className='img-container'>
                     <img
                        className='post-img'
                        src={`/uploads/${post?.img}`}
                        alt=''
                     />
                  </div>
               ) : (
                  <>D</>
               )}
               <p className='desc-container'>{getText(post?.desc)}</p>
               {currentUser?.username === post.username ? (
                  <>
                     <div className='edit'>
                        <Link
                           to={`/create?edit=2`}
                           state={post}>
                           <i className='ri-edit-line'></i>
                        </Link>
                        <i
                           className='ri-delete-bin-6-line'
                           onClick={() => setShowAlert(true)}></i>
                     </div>
                  </>
               ) : (
                  <></>
               )}
               {showAlert ? <AlertPopup
                  message='Confirm delete?'
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
               /> :<></>}
            </div>
            <Menu cat={post?.cat} />
         </div>
      </>
   );
};

export default Post;
