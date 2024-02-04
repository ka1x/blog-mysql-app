import React, {useState, useRef} from 'react';
import {categories} from '../../data/index.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {AlertPopup, Navbar} from '../../components/index.js';
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
   const [fileName, setFileName] = useState('');

   const fileInputRef = useRef(null);
   const navigate = useNavigate();

   const [openPopup, setOpenPopup] = useState(false);

   //event handlers//
   const handleFileUploadClick = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click();
      }
   };
   const handleSetFile = () => {
      const selectedFile = fileInputRef.current.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
   };

   const handleClearFile = () => {
      setFile(null);
      setFileName('');
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

   const handleAlertConfirm = () => {
      setOpenPopup(false);
   };

   const handlePublish = async (e) => {
      e.preventDefault();
      const image = await upload();

      if (title && value) {
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
      } else {
         setOpenPopup(true);
         // alert('Post invalid. Please enter a title and your post content.');
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
                  <div className='file-container'>
                     <input
                        style={{display: 'none'}}
                        type='file'
                        id='file'
                        ref={fileInputRef}
                        onChange={handleSetFile}
                     />

                     <button
                        className='file'
                        onClick={handleFileUploadClick}>
                        {state ? 'Upload New Image' : 'Upload Image'}
                     </button>
                     <div className='file-temp'>
                        {file ? (
                           <>
                              <p> Selected file: {fileName} </p>
                           </>
                        ) : (
                           <>
                              <p>No file selected</p>
                           </>
                        )}

                        {file && (
                           <div className='file-clear'>
                              <i
                                 onClick={handleClearFile}
                                 className='clear-file ri-delete-bin-6-line'></i>
                           </div>
                        )}
                     </div>
                  </div>
                  <button onClick={handlePublish}>Publish</button>
               </div>
            </div>
         </div>
         {openPopup && (
            <AlertPopup
               message='Post invalid. Please enter a title and your post content.'
               onConfirm={handleAlertConfirm}
               showCancel={false}></AlertPopup>
         )}
      </>
   );
};

export default Create;
