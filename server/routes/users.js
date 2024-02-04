import express from 'express'
import { getUser, getUserPosts } from '../controllers/users.js'

const router = express.Router()

router.get('/:id', getUser)
router.get('/:id/posts', getUserPosts)

export default router
