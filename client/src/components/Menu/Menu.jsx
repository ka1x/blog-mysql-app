import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './menu.scss';
import axios from 'axios';

const Menu = ({cat, postId}) => {
   const [posts, setPosts] = useState([]);
   const [animate, setAnimate] = useState(false);

   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const res = await axios.get(`/posts/?cat=${cat}`);
            const allPosts = res.data;
            const filteredPosts = allPosts.filter((post) => post.id !== postId);

            setPosts(filteredPosts);
            // setPosts(res.data);
         } catch (error) {
            console.log(error.message);
         }
      };
      fetchPosts();
      setAnimate(true);

      const animationDuration = 1500;
      const timeoutId = setTimeout(() => {
         setAnimate(false);
      }, animationDuration);
      return () => clearTimeout(timeoutId);
   }, [cat, postId]);

   const handleLinkClick = () => {
      // Scroll back to the top of the page
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
   };

   return (
      <div className={`menu ${animate ? 'animate' : ''}`}>
         <h1>Other posts you may like</h1>
         {posts.slice(0, 4).map((post) => (
            <div
               className='post'
               key={post.id}>
               <div className='img-container'>
                  <img
                     src={post.img ? `/uploads/${post.img}` : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
                     alt=''
                  />
               </div>
               <div className='title-container'>
                  <h2>{post?.title}</h2>
                  <Link
                     className='link'
                     to={`/post/${post.id}`}
                     onClick={handleLinkClick}>
                     {' '}
                     <div className='btn-container'>
                        <button>Read More</button>
                     </div>
                  </Link>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Menu;
