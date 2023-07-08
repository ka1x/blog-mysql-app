import React from 'react';
import {Footer, Navbar} from '../../components';
import {posts} from '../../data/index.js';
import {Link} from 'react-router-dom';
import './home.scss'

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
                           // src={`../upload/${post.img}`}
                           src={post.img}
                           alt=''
                        />
                     </div>
                     <div className='content'>
                        <div className="line"></div>
                        <p> June 21 2023</p>
                        <h1>{post.title}</h1>
                        {/* <p>{post.desc}</p> */}
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
