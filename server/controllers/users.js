import { db } from '../db.js'
import jwt from 'jsonwebtoken'

export const getUser = (req, res) => {
  const q = 'SELECT firstname, lastname, img FROM users WHERE id = ? '

  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }

    return res.status(200).json(data[0])
  })
}

export const getUserPosts = (req, res) => {
  const q = `
	  SELECT p.id, p.title, p.desc, p.img, p.date
	  FROM users u
	  JOIN posts p ON u.id = p.uid
	  WHERE u.id = ?
	  ORDER BY p.date DESC
	  LIMIT 3
	`

  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }

    return res.status(200).json(data)
  })
}

export const deleteUser = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const userId = userInfo.id

    // Step 1: Delete all posts associated with the user
    const deletePostsQuery = 'DELETE FROM posts WHERE `uid` = ?'

    db.query(deletePostsQuery, [userId], (err, postsData) => {
      if (err) return res.status(500).json('Error deleting posts')

      // Step 2: Delete the user
      const deleteUserQuery = 'DELETE FROM users WHERE `id` = ?'

      db.query(deleteUserQuery, [userId], (err, userData) => {
        if (err) return res.status(500).json('Error deleting user')

        return res.json('User and associated posts have been deleted!')
      })
    })
  })
}
