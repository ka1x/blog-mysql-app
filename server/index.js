import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: true }))

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
