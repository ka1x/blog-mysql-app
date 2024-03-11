import React, {useEffect, useState} from 'react';
import {EmptyPageMsg, Footer, Loading, Navbar, UserBar} from '../../components';
// import {posts} from '../../data/index.js';
import {Link, useLocation} from 'react-router-dom';
import './home.scss';
import axios from 'axios';
import {getText} from '../../utils/getText';

const Home = () => {
   const [posts, setPosts] = useState([]);
   const [page, setPage] = useState(0);
   const [animate, setAnimate] = useState(false);
   const [loading, setLoading] = useState(true);
   //calculating amount of posts displayed
   const postsPerPage = 5;
   const startIndex = page * postsPerPage;
   const endIndex = startIndex + postsPerPage;
   const maxPage = Math.ceil(posts.length / postsPerPage) - 1;

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
      const animationDuration = 500;
      const timeoutId = setTimeout(() => {
         setLoading(false);
         setAnimate(false);
      }, animationDuration);

      // Clean up the timeout when the component unmounts or when the page changes again
      return () => clearTimeout(timeoutId);
   }, [page, category]);

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
                                 src={post.img ? `https://ka1tstorageaccpunt.blob.core.windows.net/photos/${post.img}` : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
                                 alt=''
                              />
                           </div>
                        </Link>
                        <div className='content'>
                           <Link to={`/post/${post.id}`}>
                              <div className='text'>
                                 <h3>{getText(post?.title, 7)}</h3>
                                 <p className='desc'>{getText(post?.desc, 50)}</p>
                              </div>
                           </Link>
                           <UserBar data={post} />
                        </div>
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
         {posts.length != 0 ? <div className='home-container'>{renderPosts()}</div> : <EmptyPageMsg message={'No posts found'} />}
         <Footer
            page={page}
            setPage={setPage}
            posts={posts}
            postsPerPage={postsPerPage}
            maxPage={maxPage}
         />
            <p className='copyright'>
            This is an educational project inspired by <a href='https://oncetheme.com/'>Once.</a>
         </p>
      </>
   );
};

export default Home;
