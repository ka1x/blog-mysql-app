import express from 'express'
import {
  getUser,
  getUserPosts,
  deleteUser,
  updateProfileImg
} from '../controllers/users.js'

const router = express.Router()

router.get('/:id', getUser)
router.get('/:id/posts', getUserPosts)
router.delete('/:id', deleteUser)
router.put('/:id/photo', updateProfileImg)

export default router
