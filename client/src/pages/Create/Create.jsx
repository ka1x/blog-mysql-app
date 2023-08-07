import React, {useState, useRef} from 'react';
import {categories} from '../../data/index.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Navbar} from '../../components/index.js';
import './create.scss';
import axios from 'axios';

const Create = () => {
   //states//
   const [value, setValue] = useState('');
   const [title, setTitle] = useState('');
   const [file, setFile] = useState(null);
   const [cat, setCat] = useState('');

   const fileInputRef = useRef(null);
   //event handlers//
   const handleButtonClick = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click();
      }
   };

   const upload = async () => {
      try {
         const formData = new FormData();
         formData.append('file', file);
         const res = await axios.post('/upload', formData);
         return res.data;
      } catch (err) {
         console.log(err);
      }
   };

   const handlePublish = async (e) => {
      e.preventDefault();
      const imgUrl = await upload();
   };

   return (
      <>
         <Navbar></Navbar>
         <div className='create-container'>
            <div className='content'>
               <input
                  className='title'
                  type='text'
                  placeholder='Title'
                  onChange={(e) => setTitle(e.target.value)}
               />
               <div className='editorContainer'>
                  <ReactQuill
                     className='editor'
                     theme='snow'
                     value={value}
                     onChange={setValue}
                  />
               </div>
            </div>

            <div className='menu'>
               <div className='options'>
                  <p>
                     <b>Status: </b> Draft
                  </p>
                  <p>
                     <b>Visibility: </b> Public
                  </p>
                  <div className='file-container'>
                     <input
                        style={{display: 'none'}}
                        type='file'
                        id='file'
                        ref={fileInputRef}
                        onChange={(e) => setFile(e.target.files[0])}
                     />

                     <button
                        className='file'
                        onClick={handleButtonClick}>
                        Upload Image
                     </button>
                  </div>

                  <div className='item'>
                     <h1>Category</h1>

                     {categories.map((cat, i) => (
                        <div
                           className='cat'
                           key={i}>
                           <input
                              type='radio'
                              name='cat'
                              value={cat.linkname}
                              id={cat.linkname}
                              onChange={(e) => setCat(e.target.value)}
                           />
                           <label htmlFor={cat.linkname}>{cat.title}</label>
                        </div>
                     ))}
                  </div>
               </div>
               <div className='buttons'>
                  <button>Save as a draft</button>
                  <button onClick={handlePublish}>Publish</button>
               </div>
            </div>
         </div>
         {/* <Footer></Footer> */}
      </>
   );
};

export default Create;
