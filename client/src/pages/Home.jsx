import React from 'react';
import {Footer, Navbar} from '../components/';
import {posts} from '../data/index.js';
import {Link} from 'react-router-dom';

const Home = () => {
   return (
      <>
         <Navbar></Navbar>
         <div className='home-container'>
            <div className='home-posts'>
               {posts.map((post, i) => (
                  <div
                     className='post'
                     key={i}>
                     <div className='img'>
                        <img
                           src={`../upload/${post.img}`}
                           alt=''
                        />
                     </div>
                     <div className='content'>
                        <h1>{post.title}</h1>
                        <p>{post.desc}</p>
                        <Link
                           className='link'
                           to={`/post/${post.id}`}>
                           <button>Read More</button>
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <Footer></Footer>
      </>
   );
};

export default Home;
