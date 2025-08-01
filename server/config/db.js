// config/db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

let pool; // this will hold our connection pool

const initDB = async () => {
  try {
    // Connect without specifying DB to create it if needed
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
    });

    await connection.query(`
      CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`
      DEFAULT CHARACTER SET utf8mb4
      COLLATE utf8mb4_0900_ai_ci;
    `);

    console.log(` Database '${process.env.DB_NAME}' ensured.`);

    await connection.end();

    // Create connection pool for actual queries
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS photos (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) DEFAULT NULL,
        description TEXT,
        imageUrl VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        email VARCHAR(150) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    console.log(" Tables ensured (photos, users).");

  } catch (err) {
    console.error(" DB initialization failed:", err);
  }
};

// Export both
module.exports = {
  initDB,
  getPool: () => pool
};
