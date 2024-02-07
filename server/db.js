import mysql from 'mysql2';

export const db = mysql.createConnection({
   host: 'monorail.proxy.rlwy.net',
   user: 'root',
   password: '',
   database: 'railway',
   port : '25634',
});
