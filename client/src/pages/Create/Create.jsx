import React, {useState, useRef} from 'react';
import {categories} from '../../data/index.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {AlertPopup, Navbar, FileInput} from '../../components/index.js';
import './create.scss';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import moment from 'moment';
import {useAuth} from '../../context/AuthContext.jsx';

const Create = () => {
   //states//
   const state = useLocation().state;
   const [value, setValue] = useState(state?.desc || '');
   const [title, setTitle] = useState(state?.title || '');
   const [cat, setCat] = useState(state?.cat || categories[0].linkname);
   const [file, setFile] = useState(null);
   const {authToken} = useAuth();
   const navigate = useNavigate();
   const [openPopup, setOpenPopup] = useState(false);

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
                 await axios.put(
                    `/posts/${state.id}`,
                    {
                       title,
                       desc: value,
                       cat,
                       img: file ? image : `${state?.img}`,
                    },
                    {
                       headers: {
                          Authorization: `Bearer ${authToken}`, // Include token in request headers
                       },
                    }
                 )
               : //if posting
                 await axios.post(
                    `/posts/`,
                    {
                       title,
                       desc: value,
                       cat,
                       img: file ? image : '',
                       date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                    },
                    {
                       headers: {
                          Authorization: `Bearer ${authToken}`, // Include token in request headers
                       },
                    }
                 );
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
                  <FileInput
                     file={file}
                     setFile={setFile}
                     state={state}
                  />
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
