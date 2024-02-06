import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import { MulterAzureStorage } from 'multer-azure-blob-storage'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: true }))

const azureStorage = new MulterAzureStorage({
  connectionString:
    '***REMOVED***',
  accessKey:
    '***REMOVED***',
  accountName: 'ka1tstorageaccpunt',
  containerName: 'photos',
  blobName: (req, file) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const fileName = file.fieldname + '-' + uniqueSuffix + '.jpg'
    // console.log('Generated file name:', fileName) // Logging the generated file name
    return fileName
  },
  contentSettings: (req, file) => {
    // Define content settings here if needed
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

app.listen(8800, () => {
  console.log('listening')
})
