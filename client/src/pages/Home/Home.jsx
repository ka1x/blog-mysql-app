import React from 'react';
import {Footer, Navbar} from '../../components';
import {posts} from '../../data/index.js';
import {Link} from 'react-router-dom';
import './home.scss';

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
                        {/* <div className='line'></div> */}
                        {/* <p> June 21 2023</p> */}
                        <h3>{post.title}</h3>
                        <p className='desc'>{post.desc}</p>
                        {/* <Link
                           className='link'
                           to={`/post/${post.id}`}>
                           <button>Read More</button>
                        </Link> */}

                        <div className='user'>
                           <div>
                              <div className='user-pfp'>
                                 <img
                                    src='https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600'
                                    alt=''
                                 />
                              </div>
                              <div className='name-container'>
                                 <p>ABRAHAM COLLINS</p>
                                 <span className='date'> June 21 2023</span>
                              </div>
                           </div>

                           <div className='share'>
                              <span>1k shares</span>
                              <i className='ri-facebook-fill'></i>
                              <i className='ri-twitter-fill'></i>
                              <i className='ri-pinterest-fill'></i>
                           </div>
                        </div>
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
