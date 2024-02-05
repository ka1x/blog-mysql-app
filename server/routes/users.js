import express from 'express'
import { getUser, getUserPosts, deleteUser,updateProfileImg,setNewPassword } from '../controllers/users.js'

const router = express.Router()

router.get('/:id', getUser)
router.get('/:id/posts', getUserPosts)
router.delete('/:id', deleteUser)
router.put('/:id/photo', updateProfileImg)
router.put('/:id/password', setNewPassword)



export default router