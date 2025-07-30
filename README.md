
Project Setup & Run Instructions
-- Tech Stack---
Frontend: React (Vite)
Backend: Node.js + Express
Database: MySQL

---Create MySQL Database--------
Open MySQL CLI or your GUI (MySQL Workbench)

--Create the database and required table-------

CREATE DATABASE photo_album;

USE photo_album;

CREATE TABLE photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


----Configure Environment Variables-----
Create a .env file inside server/:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Root
DB_NAME=photo_album


---- Clone the Repository-----
 
git clone https://github.com/mallikarjun1507/Photo-Album.git
cd Photo-Album
code .

--- Backend Setup (/server)----
a. Install Dependencies--

cd server
npm install

 ---Start the Backend Server---
node server.js


---Frontend Setup (/client)---
a. Install Dependencies---
cd ../client
npm install

---Start the React App---
npm run dev
