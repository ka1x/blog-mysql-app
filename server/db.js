// import mysql from 'mysql2';
// import dotenv from 'dotenv'
// dotenv.config()

// export const db = mysql.createConnection({
//    host: 'monorail.proxy.rlwy.net',
//    user: 'root',
//    password: process.env.DB_PASS,
//    database: 'railway',
//    port : '25634',
// });


import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

let db;

function createConnection() {
    db = mysql.createConnection({
        host: 'monorail.proxy.rlwy.net',
        user: 'root',
        password: process.env.DB_PASS,
        database: 'railway',
        port: '25634',
    });

    db.connect(function (err) {
        if (err) {
            console.log("error when connecting to db:", err);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log("connection is successful");
        }
    });

    db.on("error", function (err) {
        console.log("db error", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

function handleDisconnect() {
    createConnection();
}

createConnection();

export { db };
