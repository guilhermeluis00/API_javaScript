const express = require('express');
const router = require('./router');
const app = express();

const bcrypt = require('bcryptjs');
const prisma = require('./lib/prisma');

async function cadastrarUsuario(req, res) {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
      },
    });

    // Remove a senha por segurança antes de responder
    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json(userWithoutPassword);

  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao cadastrar o usuário.' });
  }
}

module.exports = { cadastrarUsuario };
