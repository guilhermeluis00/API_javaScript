const express = require('express');
const cadastro = require('./cadastro');
const login = require('./login');
const router = require('./router');
const prisma = require('./lib/prisma');
const app = express();

app.use(express.json());
app.use(router);


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

