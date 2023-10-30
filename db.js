// db.js

const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'developer',
  password: 'moninha',
  database: 'servicos_db',
  port: 3306,
};

async function connectToDB() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

module.exports = { connectToDB };
