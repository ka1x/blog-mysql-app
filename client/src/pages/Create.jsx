import React, {useState} from 'react';
import {categories} from '../data/index.js';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Footer, Navbar} from '../components'


const Create = () => {
  //states//
   const [value, setValue] = useState('');
   const [title, setTitle] = useState('');
   const [file, setFile] = useState(null);
   const [cat, setCat] = useState('');

//event handlers//
   const handleClick = () =>{

   }

   return (
    <>
    <Navbar></Navbar>
      <div className='create-container'>
         <div className='content'>
            <input
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
            <div className='item'>
               <h1>Publish</h1>
               <span>
                  <b>Status: </b> Draft
               </span>
               <span>
                  <b>Visibility: </b> Public
               </span>
               <input
                  style={{display: 'none'}}
                  type='file'
                  id='file'
                  name=''
                  onChange={(e) => setFile(e.target.files[0])}
               />
               <label
                  className='file'
                  htmlFor='file'>
                  Upload Image
               </label>
               <div className='buttons'>
                  <button>Save as a draft</button>
                  <button onClick={handleClick}>Publish</button>
               </div>
            </div>
            <div className='item'>
               <h1>Category</h1>

               {categories.map((cat, i) => (
                  <div className='cat' key={i}>
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
      </div>
<Footer></Footer>
      </>

   );
};

export default Create;
