import { db } from '../db.js'
import jwt from 'jsonwebtoken'
import fs from 'fs'

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? `SELECT p.id, p.title, p.desc, p.img, p.cat, p.uid as userId, p.date, u.img AS userImg, u.firstname, u.lastname
		FROM posts p
		JOIN users u ON p.uid = u.id
		WHERE p.cat = ?
    order by date desc`
    : `SELECT p.id, p.title, p.desc, p.img, p.cat,  p.uid as userId, p.date, u.img AS userImg, u.firstname, u.lastname
		FROM posts p
		JOIN users u ON p.uid = u.id
    order by date desc`

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err)

    return res.status(200).json(data)
  })
}
export const getPost = (req, res) => {
  const q =
    'SELECT p.id, `firstname`, `lastname`, `username`, `title`, `desc`, p.img, p.uid as userId, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? '

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err)

    return res.status(200).json(data[0])
  })
}

export const addPost = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q =
      'INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)'

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id
    ]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.json('Post has been created.')
    })
  })
}

export const updatePost = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const postId = req.params.id
    const q =
      'UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?'

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat]

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.json('Post has been updated.')
    })
  })
}
export const deletePost = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const postId = req.params.id

    const q = 'DELETE FROM posts WHERE `id` = ? AND `uid` = ?'

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json('You can delete only your post!')

      return res.json('Post has been deleted!')
    })
  })
}

const deleteOrphanedImages = () => {
  const selectQuery = 'SELECT `id`, `img` FROM posts'
  db.query(selectQuery, (err, rows) => {
    if (err) {
      console.error('Error retrieving posts:', err)
      return
    }

    const imagePathsInDatabase = rows.map(row => row.img)

    // Read the directory containing your uploaded images
    const imageUploadsPath = '../client/public/uploads'
    fs.readdir(imageUploadsPath, (readErr, files) => {
      if (readErr) {
        console.error('Error reading directory:', readErr)
        return
      }

      // Delete images that are in the directory but not in the database
      files.forEach(file => {
        const imagePath = `${imageUploadsPath}/${file}`

        if (!imagePathsInDatabase.includes(file)) {
          fs.unlink(imagePath, unlinkErr => {
            if (unlinkErr) {
              console.error('Error deleting image:', unlinkErr)
            } else {
              console.log('Orphaned image deleted:', imagePath)
            }
          })
        }
      })
    })
  })
}

// const interval = 3600000 * 8 // 1 hour * 8
// setInterval(deleteOrphanedImages, interval)
