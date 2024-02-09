
<h1 align="center">
  <br>
   B L O G
  <br>
</h1>

<h4 align="center">A fullstack blog webapp built with React and Vite with Node.js and Express on the backend.</h4>
<p  align="center">
 <a href="https://mysql-blog.up.railway.app/">
   Website Link
  </a>
</p>



<p align="center">
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/-React-252525?logo=react&style=for-the-badge"
    >
  </a>
   <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/-Vite-252525?logo=vite&style=for-the-badge"
    >
  </a>
  <a href="https://nodejs.org/en">
    <img src="https://img.shields.io/badge/-Node.Js-252525?logo=node.js&style=for-the-badge"
    >
  </a>
<a href="https://expressjs.com/">
    <img src="https://img.shields.io/badge/-Express-252525?logo=express&style=for-the-badge"
    >
  </a>
  <a href="https://www.mysql.com/">
    <img src="https://img.shields.io/badge/-MySQL-252525?logo=mysql&style=for-the-badge"
    >
  </a>
</p>



<p align="center">
    <a href="#key-features">Key Features</a> •
        <a href="#Deployment">Deployment</a> •
  <a href="#credits">Credits</a>
</p>

<br/>

![Screenshot 2024-02-09 at 19-34-55 B L O G](https://github.com/ka1x/blog-mysql-app/assets/104195913/b3423921-9c4c-48fa-b7d2-5236998d8474)

<br/>

## Key Features

- Browse new posts, with the option to choose category
- Create, edit and delete blog posts with the option to upload photos
- Login and registration of new users
- User profile pages displaying basic information and recent posts
- Responsive design

## Deployment

The project is deployed using [Railway](https://railway.app/) and integrated with an Azure storage account to provide storage for uploaded content. Infrastructure of the app consists of two docker images, one for server and one for client, and a MySQL database inside Railway. 

Server uses [mutler](https://www.npmjs.com/package/multer) with [multer azure cloud storage](https://www.npmjs.com/package/multer-azure-blob-storage) to process file upload.

## Credits

Credit to [Once](https://oncetheme.com/) for visual inspiration of the app homepage.

Credit to [Amit Merchant](https://github.com/amitmerchant1990) for markdown template.

<br/>
