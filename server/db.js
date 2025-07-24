const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Root',
  database: 'photo_album',
});

module.exports = db;
