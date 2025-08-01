require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  try {
    // Step 1: Connect to MySQL without specifying DB
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
    });

    const dbName = process.env.DB_NAME;

    // Step 2: Create database if it doesn't exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;`
    );

    console.log(` Database '${dbName}' ensured.`);

    // Step 3: Connect to the database
    await connection.changeUser({ database: dbName });

    // Step 4: Create tables if they don't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS photos (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) DEFAULT NULL,
        description TEXT,
        imageUrl VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await connection.query(`
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

    await connection.end();
  } catch (err) {
    console.error(" Database initialization failed:", err);
  }
})();
