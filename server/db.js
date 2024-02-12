import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config()

export const db = mysql.createConnection({
   host: 'monorail.proxy.rlwy.net',
   user: 'root',
   password: process.env.DB_PASS,
   database: 'railway',
   port : '25634',
});
