import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: true }))

//multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
  }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file
  res.status(200).json(file.filename)
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
