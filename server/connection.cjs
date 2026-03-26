const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: "127.0.0.1",
    port: 8889,         //port: 3306
    user: "root",
    password: "root",   //password: ""
    database: "projectdb"
});

conn.connect();
module.exports = conn;