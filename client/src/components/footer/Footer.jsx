import React from 'react';
import './footer.scss';

const Footer = ({page, setPage, posts, postsPerPage}) => {
   const handleLeft = () => {
      if (page > 0) {
         setPage(page - 1);
      }
   };

   const handleRight = () => {
      const maxPage = Math.floor(posts.length / postsPerPage);
      if (page < maxPage) {
         setPage(page + 1);
      }
   };

   return (
      <footer className='footer'>
         <i
            className='ri-arrow-left-s-line'
            onClick={handleLeft}></i>
         <i
            className='ri-arrow-right-s-line'
            onClick={handleRight}></i>
      </footer>
   );
};

export default Footer;
