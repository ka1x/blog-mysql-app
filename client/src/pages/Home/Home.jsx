import React, {useEffect, useState} from 'react';
import {Footer, Loading, Navbar, UserBar} from '../../components';
// import {posts} from '../../data/index.js';
import {Link, useLocation} from 'react-router-dom';
import './home.scss';
import axios from 'axios';

const Home = () => {
   const [posts, setPosts] = useState([]);
   const [page, setPage] = useState(0);
   const [animate, setAnimate] = useState(false);

   const [loading, setLoading] = useState(true);

   const postsPerPage = 5;
   const startIndex = page * postsPerPage;
   const endIndex = startIndex + postsPerPage;
   const maxPage = Math.floor(posts.length / postsPerPage);

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
      setLoading(false);
   }, [category]);

   useEffect(() => {
      // Whenever the page changes, trigger the animation
      setAnimate(true);
      setLoading(true);

      // After the animation duration, reset the animate state
      const animationDuration = 500; // 1 second
      const timeoutId = setTimeout(() => {
         setLoading(false);
         setAnimate(false);
      }, animationDuration);

      // Clean up the timeout when the component unmounts or when the page changes again
      return () => clearTimeout(timeoutId);
   }, [page]);

   const getText = (html, maxWords) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const textContent = doc.body.textContent.trim(); // Remove leading/trailing whitespace
      const words = textContent.split(/\s+/); // Split into words

      // const maxWords = 100;
      let truncatedText = words.slice(0, maxWords).join(' ');

      if (words.length > maxWords) {
         truncatedText += '...';
      }
      return truncatedText;
   };

   const renderPosts = () => {
      return (
         <>
            {loading ? (
               <Loading />
            ) : (
               <div className={`home-posts ${animate ? 'active' : ''}`}>
                  {posts.slice(startIndex, endIndex).map((post, i) => (
                     <div
                        className={`post `}
                        key={i}>
                        <Link to={`/post/${post.id}`}>
                           <div className='img'>
                              <img
                                 src={post.img ? `/uploads/${post.img}` : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
                                 alt=''
                              />
                           </div>
                           <div className='content'>
                              <div className='text'>
                                 {/* <h3>{post?.title}</h3> */}
                                 <h3>{getText(post?.title, 8)}</h3>
                                 <p className='desc'>{getText(post?.desc, 100)}</p>
                              </div>
                              <UserBar data={post} />
                           </div>
                        </Link>
                     </div>
                  ))}
               </div>
            )}
         </>
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
