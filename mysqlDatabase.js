import mysql from "mysql2";
// environment variable 사용할 수 있게 해주는거
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306, // railway deploy를 위한 것
  })
  .promise();

export async function getNotes() {
  console.log("DB WORKING");
  let query = `SELECT * FROM notes`;
  const [rows] = await pool.query(query);
  return rows;
  // return (await pool.query("SELECT * FROM notes"))
}

export async function addNote(title, contents) {
  const query = `INSERT INTO notes (title, contents) VALUES (?,?)`;
  const [result] = await pool.query(query, [title, contents]);
  return result;
}

export async function deleteNote(id) {
  const [result] = await pool.query(`DELETE FROM notes WHERE id = ?`, [id]);
  return result;
}
// ? -> 이걸 data injunction? 이라고 함..?  ? == ${title}
