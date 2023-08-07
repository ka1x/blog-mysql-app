import React, {useEffect, useState} from 'react';
import {categories, posts} from '../../data/index.js';
import {Link} from 'react-router-dom';
import './menu.scss';
import axios from 'axios';

const Menu = ({cat}) => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const res = await axios.get(`/posts/?cat=${cat}`);
            setPosts(res.data);
         } catch (error) {
            console.log(error.message);
         }
      };
      fetchPosts();
   }, [cat]);

   return (
      <div className='menu'>
         <h1>Other posts you may like</h1>
         {posts.slice(0, 4).map((post) => (
            <div
               className='post'
               key={post.id}>
               <div className='img-container'>
                  <img
                     // src={`../upload/${post?.img}`}
                     src={`${post?.img}`}
                     alt=''
                  />
               </div>
               <div className='title-container'>
                  <h2>{post.title}</h2>
                  <Link
                     className='link'
                     to={`/post/${post.id}`}>
                     <div className='btn-container'>
                        <button>Read More</button>
                        {/* <i className='ri-arrow-right-s-line'></i> */}
                     </div>
                  </Link>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Menu;
