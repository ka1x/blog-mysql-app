import {db} from '../db.js';
import bcrypt from 'bcryptjs';

export const register = (req, res) => {
   //check exisiting user
   const q = 'select * from users where email = ? or username = ?';
   db.query(q, [req.body.email, req.body.name], (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json('user already exists');

      //hash password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      //inserting into database
      const q = 'insert into users(`username`,`email`,`password`) values (?)';
      const values = [req.body.username, req.body.email, hash];

      db.query(q, [values], (err, data) => {
         if (err) return res.json(err);
         return res.status(200).json('user created');
      });
   });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
