import React, {useEffect, useState} from 'react';
import {Footer, Navbar, UserBar} from '../../components';
// import {posts} from '../../data/index.js';
import {Link, useLocation} from 'react-router-dom';
import './home.scss';
import axios from 'axios';

const Home = () => {
   const [posts, setPosts] = useState([]);
   const [page, setPage] = useState(0);
   const [animate, setAnimate] = useState(false);

   const postsPerPage = 5;
   const startIndex = page * postsPerPage;
   const endIndex = startIndex + postsPerPage;
   const maxPage = Math.floor(posts.length / postsPerPage - 1);

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
      setPage(0);
   }, [category]);

   useEffect(() => {
      // Whenever the page changes, trigger the animation
      setAnimate(true);

      // After the animation duration, reset the animate state
      const animationDuration = 1000; // 1 second
      const timeoutId = setTimeout(() => {
         setAnimate(false);
      }, animationDuration);

      // Clean up the timeout when the component unmounts or when the page changes again
      return () => clearTimeout(timeoutId);
   }, [page]);

   const getText = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const textContent = doc.body.textContent.trim(); // Remove leading/trailing whitespace
      const words = textContent.split(/\s+/); // Split into words

      const maxWords = 100;
      let truncatedText = words.slice(0, maxWords).join(' ');

      if (words.length > maxWords) {
         truncatedText += ' ...';
      }

      return truncatedText;
   };

   const renderPosts = () => {
      return (
         <div className={`home-posts ${animate ? 'active' : ''}`}>
            {posts.slice(startIndex, endIndex).map((post, i) => (
               <div
                  className={`post `}
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
                     <p className='desc'>{getText(post?.desc)}</p>

                     <UserBar data={post} />
                  </div>
               </div>
            ))}
         </div>
      );
   };

   return (
      <>
         <Navbar />
         <div className='home-container'>{renderPosts()}</div>
         <Footer
            page={page}
            setPage={setPage}
            posts={posts}
            postsPerPage={postsPerPage}
            maxPage={maxPage}
         />
      </>
   );
};

export default Home;
