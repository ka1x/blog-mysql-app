import { db } from '../db.js'

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? 'SELECT * FROM posts WHERE cat=?'
    : 'SELECT * FROM posts'

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err)

    return res.status(200).json(data)
  })
}
export const getPost = (req, res) => {
  const q =
    'SELECT p.id, `firstname`, `lastname`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? '

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err)

    return res.status(200).json(data[0])
  })
}
export const addPost = (req, res) => {}
export const updatePost = (req, res) => {}
export const deletePost = (req, res) => {
	const token = req.cookies.user;
	if (!token) return res.status(401).json("Not authenticated!");
 
	jwt.verify(token, "jwtkey", (err, userInfo) => {
	  if (err) return res.status(403).json("Token is not valid!");
 
	  const postId = req.params.id;
	  const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
 
	  db.query(q, [postId, userInfo.id], (err, data) => {
		 if (err) return res.status(403).json("You can delete only your post!");
 
		 return res.json("Post has been deleted!");
	  });
	});
}
