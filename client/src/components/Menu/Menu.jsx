import React from 'react';
import {categories, posts} from '../../data/index.js';
import {Link} from 'react-router-dom'

const Menu = ({cat}) => {
   return (
      <div className='menu'>
         <h1>Other posts you may like</h1>
         {posts.map((post) => (
            <div
               className='post'
               key={post.id}>
               <img
                  src={`../upload/${post?.img}`}
                  alt=''
               />
               <h2>{post.title}</h2>
               <Link
                  className='link'
                  to={`/post/${post.id}`}>
                  <button>Read More</button>
               </Link>{' '}
            </div>
         ))}
      </div>
   );
};

export default Menu;
