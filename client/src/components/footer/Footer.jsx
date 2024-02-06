import React from 'react';
import './footer.scss';
import {scrollToTop} from '../../utils/scrollToTop';

const Footer = ({page, setPage, maxPage}) => {
   const handleLeft = () => {
      if (page > 0) {
         setPage(page - 1);
         scrollToTop();
      }
   };

   const handleRight = () => {
      if (page < maxPage) {
         setPage(page + 1);
         scrollToTop();
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
