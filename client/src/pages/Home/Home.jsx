import React, {useEffect, useState} from 'react';
import {Footer, Navbar, UserBar} from '../../components';
// import {posts} from '../../data/index.js';
import {Link, useLocation} from 'react-router-dom';
import './home.scss';
import axios from 'axios';
import DOMPurify from 'dompurify';


const Home = () => {
   const [posts, setPosts] = useState([]);
   const [page, setPage] = useState(0);

   const postsPerPage = 5;
   const startIndex = page * postsPerPage;
   const endIndex = startIndex + postsPerPage;

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

   const renderPosts = () => {
      return (
         <div className='home-posts'>
            {posts.slice(startIndex, endIndex).map((post, i) => (
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

                     <p className='desc'  dangerouslySetInnerHTML={{
                     __html: DOMPurify.sanitize(post?.desc),
                  }}>
                     {/* {post?.desc} */}
                     </p>

                     <UserBar data={post} />
                  </div>
               </div>
            ))}
         </div>
      );
   };

   // useEffect(() => {
   //    console.log('page ' + page + ' start ' + startIndex + ' end ' + endIndex);
   // }, [page]);

   return (
      <>
         <Navbar />
         <div className='home-container'>
            {/* <div className='home-posts'>
               {posts.slice(page[0], page[1]).map((post, i) => (
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

                        <UserBar data={post} />
                     </div>
                  </div>
               ))}
            </div> */}
            {renderPosts()}
         </div>
         <Footer
            page={page}
            setPage={setPage}
            posts={posts}
            postsPerPage={postsPerPage}
         />
      </>
   );
};

export default Home;
