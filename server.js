// server.js

const express = require('express');
const bodyParser = require('body-parser');
const prestadoresController = require('./prestadoresController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/prestadores', async (req, res) => {
  const prestadores = await prestadoresController.getAllPrestadores();
  res.json(prestadores);
});

app.get('/prestadores/:nome_prestador', async (req, res) => {
  const nome_prestador = req.params.nome_prestador;  
  const prestadores = await prestadoresController.getPrestadorById(nome_prestador);
  res.json(prestadores);
});

app.post('/prestadores', async (req, res) => {
  const { nome_prestador, cpf_prestador } = req.body;
  if (!nome_prestador || !cpf_prestador) {
    return res.status(400).json({ error: 'Nome e CPF do prestador são obrigatórios' });
  }

  const codigo_prestador = await prestadoresController.createPrestador(nome_prestador, cpf_prestador);
  res.json({ message: 'Prestador de serviço criado com sucesso', codigo_prestador });
});

app.put('/prestadores/:codigo_prestador', async (req, res) => {
  const codigo_prestador = req.params.codigo_prestador;
  const { nome_prestador, cpf_prestador } = req.body;

  if (!nome_prestador || !cpf_prestador) {
    return res.status(400).json({ error: 'Nome e CPF do prestador são obrigatórios' });
  }

  await prestadoresController.updatePrestador(codigo_prestador, nome_prestador, cpf_prestador);
  res.json({ message: 'Prestador de serviço atualizado com sucesso' });
});

app.delete('/prestadores/:codigo_prestador', async (req, res) => {
  const codigo_prestador = req.params.codigo_prestador;
  await prestadoresController.deletePrestador(codigo_prestador);
  res.json({ message: 'Prestador de serviço excluído com sucesso' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
