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
  const query = `INSERT NTO notes (title, contents) VALUES (?,?)`;
  await pool.query(query, [title, contents]);
}
// ? -> 이걸 data injunction? 이라고 함..?  ? == ${title}
