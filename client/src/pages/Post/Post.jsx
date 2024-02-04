import React, {useEffect, useState} from 'react';
import {Navbar, Menu, UserBar, AlertPopup, Loading} from '../../components';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import './post.scss';
import {useAuth} from '../../context/AuthContext';
import axios from 'axios';

const Post = () => {
   const [post, setPost] = useState({});

   const location = useLocation();
   const postId = location.pathname.split('/')[2];

   const [loading, setLoading] = useState(true);

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
      setLoading(false);
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
      try {
         await axios.delete(`/posts/${postId}`);
         navigate('/');
      } catch (err) {
         console.log(err);
      }
   };

   const getText = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent;
   };

   return (
      <>
         {loading ? (
            <Loading />
         ) : (
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
                  </div>
                  <Menu cat={post?.cat} />
                  {showAlert && (
                     <AlertPopup
                        message='Confirm delete?'
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        showCancel={true}
                     />
                  )}
               </div>
            </>
         )}
      </>
   );
};

export default Post;
