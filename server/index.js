import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import { MulterAzureStorage } from 'multer-azure-blob-storage'
import dotenv from 'dotenv'
import { db } from './db.js'


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: true }))
dotenv.config()

const azureStorage = new MulterAzureStorage({
  connectionString:
    process.env.AZURE_CONN_STRING,
  accessKey:
    process.env.AZURE_KEY,
  accountName: process.env.AZURE_ACCOUNT_NAME,
  containerName: 'photos',
  blobName: (req, file) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const fileName = file.fieldname + '-' + uniqueSuffix + '.jpg'
    return fileName
  },
  contentSettings: (req, file) => {
    return { contentType: 'image/jpeg' }
  },
  containerAccessLevel: 'blob',
  urlExpirationTime: 60
})

const upload = multer({ storage: azureStorage })
app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  res.status(200).json(file.blobName)
})

//routes import//
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'

//routes//
app.use('/api/posts/', postRoutes)
app.use('/api/auth/', authRoutes)
app.use('/api/user/', userRoutes)

// Function to execute SELECT 1 query periodically to keep the database connection alive
const keepAlive = () => {
  db.query('SELECT 1', (err, result) => {
    if (err) {
      console.error('Error executing keep-alive query:', err)
    } else {
      console.log('Database connection alive.')
    }
  })
}

// Execute keepAlive function every 5 minutes (adjust interval as needed)
setInterval(keepAlive, 10800000); // 10800000 milliseconds = 3 hours

app.listen(8800, () => {
  console.log('listening')
})
