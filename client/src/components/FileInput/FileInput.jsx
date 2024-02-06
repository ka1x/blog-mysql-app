import React, {useState, useRef} from 'react';
import './fileinput.scss';

const FileInput = ({file, setFile, state}) => {
   const [fileName, setFileName] = useState('');

   const fileInputRef = useRef(null);

   const handleFileUploadClick = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click();
      }
   };
   const handleSetFile = () => {
      const selectedFile = fileInputRef.current.files[0];
      if (selectedFile) {
         const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
         if (allowedTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
         } else {
            alert('Please choose a valid .jpeg, .jpg, or .png file.');
            fileInputRef.current.value = null;
            setFile(null);
            setFileName('');
         }
      }
   };

   const handleClearFile = () => {
      setFile(null);
      setFileName('');
   };

   return (
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
   );
};

export default FileInput;
