import express from 'express'
import { getUser, getUserPosts, deleteUser } from '../controllers/users.js'

const router = express.Router()

router.get('/:id', getUser)
router.get('/:id/posts', getUserPosts)
router.delete('/:id', deleteUser)

export default router
