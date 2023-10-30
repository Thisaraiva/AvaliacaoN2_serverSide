// prestadoresController.js

const { connectToDB } = require('./db');

async function getAllPrestadores() {
  const connection = await connectToDB();
  const [rows] = await connection.execute('SELECT * FROM prestador');
  connection.end();
  return rows;
}

async function getPrestadorById(nome) {
  const connection = await connectToDB();
  const [rows] = await connection.execute('SELECT * FROM prestador WHERE nome_prestador = ?', [nome]);
  connection.end();
  return rows;
}

async function createPrestador(nome, cpf) {
  const connection = await connectToDB();
  const [result] = await connection.execute('INSERT INTO prestador (nome_prestador, cpf_prestador) VALUES (?, ?)', [nome, cpf]);
  connection.end();
  return result.insertId;
}

async function updatePrestador(codigo, nome, cpf) {
  const connection = await connectToDB();
  await connection.execute('UPDATE prestador SET nome_prestador = ?, cpf_prestador = ? WHERE codigo_prestador = ?', [nome, cpf, codigo]);
  connection.end();
}

async function deletePrestador(codigo) {
  const connection = await connectToDB();
  await connection.execute('DELETE FROM prestador WHERE codigo_prestador = ?', [codigo]);
  connection.end();
}

module.exports = {
  getAllPrestadores,
  getPrestadorById,
  createPrestador,
  updatePrestador,
  deletePrestador,
};
