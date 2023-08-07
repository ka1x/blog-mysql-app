import { db } from '../db.js'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

//REGISTERING USER//

export const register = (req, res) => {
  //check exisiting user
  const q = 'select * from users where email = ? or username = ?'
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    //handling errors
    if (err) return res.json(err)
    if (data.length) return res.status(409).json('user already exists')

    //hash password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    //inserting into database
    const q = 'insert into users(`username`,`email`,`password`, `firstname`, `lastname`) values (?)'
    const values = [req.body.username, req.body.email, hash, req.body.firstname, req.body.lastname]

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json('user created')
    })
  })
}

export const login = (req, res) => {
  //check if user exists
  const q = 'select * from users where username = ?'

  db.query(q, [req.body.username], (err, data) => {
    //handling errors
    if (err) return res.json(err)
    if (data.length === 0) return res.status(404).json('user not found')

    //check passeword
    const isPassCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    )
    if (!isPassCorrect)
      return res.status(400).json('wrong username or password')

    //token will be stored in cookie
    const token = jwt.sign({ id: data[0].id }, 'jwtkey')
    const { password, ...other } = data[0]

    res
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'none', // Allow cross-site access, requires secure connection (HTTPS)
        secure: true
        // sameSite: 'lax',
      })
      .status(200)
      .json(other)
  })
}

export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true
    })
    .status(200)
    .json('User has been logged out.')
}
