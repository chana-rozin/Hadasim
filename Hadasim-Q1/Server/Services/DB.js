import mysql from 'mysql2/promise';
import config from '../config.js';

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results,] = await connection.query(sql, params);
  return results;
}

export { query}