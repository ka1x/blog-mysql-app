import { db } from '../db.js'
import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

export const getUser = (req, res) => {
  const q = 'SELECT firstname, lastname, img, id FROM users WHERE id = ? '

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

export const updateProfileImg = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const userId = userInfo.id
    const q = 'UPDATE users SET `img`=? WHERE `id` = ?'

    const values = [req.body.img]

    db.query(q, [...values, userId], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.json('Profile image has been updated.')
    })
  })
}

export const setNewPassword = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const userId = userInfo.id
    const oldPassword = req.body.oldPass
    const newPassword = req.body.newPass

    // Step 1: Fetch the user's current hashed password from the database
    const fetchUserPasswordQuery = 'SELECT `password` FROM users WHERE `id` = ?'

    db.query(fetchUserPasswordQuery, [userId], (fetchErr, fetchResult) => {
      if (fetchErr) return res.status(500).json('Error fetching user password')

      const hashedPasswordFromDB = fetchResult[0].password

      // Step 2: Compare the provided old password with the hashed password in the database
      bcrypt.compare(
        oldPassword,
        hashedPasswordFromDB,
        (compareErr, passwordMatch) => {
          if (compareErr || !passwordMatch) {
            return res.status(401).json('Old password is incorrect')
          }

          // Step 3: Hash the new password
          bcrypt.hash(newPassword, 10, (hashErr, hashedPassword) => {
            if (hashErr) return res.status(500).json('Error hashing password')

            // Step 4: Update the user's password in the database
            const updatePasswordQuery =
              'UPDATE users SET `password` = ? WHERE `id` = ?'

            db.query(
              updatePasswordQuery,
              [hashedPassword, userId],
              (updateErr, updateResult) => {
                if (updateErr)
                  return res.status(500).json('Error updating password')

                return res.json('Password has been successfully updated!')
              }
            )
          })
        }
      )
    })
  })
}
