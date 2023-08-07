import React, {useState, useRef} from 'react';
import {categories} from '../../data/index.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Navbar} from '../../components/index.js';
import './create.scss';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import moment from 'moment';

const Create = () => {
   //states//
   const state = useLocation().state;
   const [value, setValue] = useState(state?.desc || '');
   const [title, setTitle] = useState(state?.title || '');
   const [cat, setCat] = useState(state?.cat || '');
   const [file, setFile] = useState(null);

   const fileInputRef = useRef(null);
   const navigate = useNavigate();

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
      const image = await upload();

      try {
         state
            ? //if editing
              await axios.put(`/posts/${state.id}`, {
                 title,
                 desc: value,
                 cat,
                 img: file ? image : `${state?.img}`,
              })
            : //if posting
              await axios.post(`/posts/`, {
                 title,
                 desc: value,
                 cat,
                 img: file ? image : '',
                 date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
              });
         navigate('/');
      } catch (err) {
         console.log(err);
      }
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
                  value={title}
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

                     {categories.map((item, i) => (
                        <div
                           className='cat'
                           key={i}>
                           <input
                              type='radio'
                              name='cat'
                              value={item.linkname}
                              id={item.linkname}
                              onChange={(e) => setCat(e.target.value)}
                              checked={cat === item.linkname}
                           />
                           <label htmlFor={item.linkname}>{item.title}</label>
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
