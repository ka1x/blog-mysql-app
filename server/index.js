import express from 'express'
import cors from 'cors';
//routes import//
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'

const app = express()
app.use(express.json())
app.use(cors())

//routes//
app.use('/api/posts/',postRoutes)
app.use('/api/auth/',authRoutes)
app.use('/api/user/',userRoutes)

app.listen(8800,()=>{
	console.log('listening');
})
