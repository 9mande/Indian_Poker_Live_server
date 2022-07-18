import mysql from "mysql2/promise";
import dotenv from "dotenv";
import config from "../config/index.js";
import util from "util";
dotenv.config();

var pool;

const dbConnection = () => {
  console.log(config.mysql);
  pool = mysql.createPool(config.mysql);
}

dbConnection();

export default async function getConnection(query, values) {
  let result = [];
  let connection = await pool.getConnection(async function (err, conn) {
    if (err) {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
      }
      else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
        console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
      }
      else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
        console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
      }
      else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
        console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
      }
      else {
        console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
      }
      setTimeout(dbConnection, 5000);
    } else {
    }
  });

  if (connection !== undefined && query !== undefined){
    console.log('querying    ', query, values);
    result = await connection.query(query, values);
    connection.release();
  }

  return result;
}
