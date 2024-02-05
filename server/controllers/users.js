import { db } from '../db.js'

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
