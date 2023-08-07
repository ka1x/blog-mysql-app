import React, {useEffect, useState} from 'react';
import {Footer, Navbar, UserBar} from '../../components';
// import {posts} from '../../data/index.js';
import {Link, useLocation} from 'react-router-dom';
import './home.scss';
import axios from 'axios';

const Home = () => {
   const [posts, setPosts] = useState([]);

   const category = useLocation().search;

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await axios.get(`/posts${category}`);
            setPosts(res.data);
         } catch (error) {
            console.log(error.message);
         }
      };
      fetchData();
   }, [category]);

   return (
      <>
         <Navbar></Navbar>
         <div className='home-container'>
            <div className='home-posts'>
               {posts.slice(0, 5).map((post, i) => (
                  <div
                     className='post'
                     key={i}>
                     <div className='img'>
                        <img
                           src={`/uploads/${post?.img}`}
                           alt=''
                        />
                     </div>
                     <div className='content'>
                        <Link to={`/post/${post.id}`}>
                           <h3>{post?.title}</h3>
                        </Link>

                        <p className='desc'>{post?.desc}</p>

                        <UserBar data={post}></UserBar>
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
