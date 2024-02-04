import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './menu.scss';
import axios from 'axios';

const Menu = ({cat, postId}) => {
   const [posts, setPosts] = useState([]);

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
   }, [cat, postId]);

   return (
      <div className='menu'>
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
                     to={`/post/${post.id}`}>
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
