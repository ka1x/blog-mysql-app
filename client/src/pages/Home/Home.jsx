import React, {useEffect, useState} from 'react';
import {Footer, Navbar, UserBar} from '../../components';
// import {posts} from '../../data/index.js';
import {Link} from 'react-router-dom';
import './home.scss';
import axios from 'axios';

const Home = () => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await axios.get('/posts');
            setPosts(res.data);
         } catch (error) {
            console.log(error.message);
         }
      };
      fetchData();
   }, []);

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
                        <h3>{post.title}</h3>
                        <p className='desc'>{post.desc}</p>

                        <UserBar></UserBar>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         {/* <Footer></Footer> */}
      </>
   );
};

export default Home;
