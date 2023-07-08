import React from 'react';
import {Footer, Navbar, Menu} from '../../components';
import {Link} from 'react-router-dom';
import './post.scss'

const post = {
   id: 1,
   title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
   desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
   img: 'https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};

const Post = () => {
   // event handlers //
   const handleDelete = () => {};

   return (
      <>
         <Navbar></Navbar>
         <div className='post-container'>
            <div className='content'>
               <img
                  src={`../upload/${post?.img}`}
                  alt=''
               />
               <div className='user'>
                  {post.userImg && (
                     <img
                        src={post.userImg}
                        alt=''
                     />
                  )}
                  <div className='info'>
                     <span>{post.username}</span>
                     <p>Posted {post.date}</p>
                  </div>

                  {/* <div className="edit">
              <Link to={`/write?edit=2`}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div> */}
               </div>
               <h1>{post.title}</h1>
               <p>{post.desc}</p>
            </div>
            <Menu cat={post.cat} />
         </div>
         <Footer></Footer>
      </>
   );
};

export default Post;
