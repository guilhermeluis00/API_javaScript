const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //Importa o jsonwebtoken
const prisma = require('./lib/prisma');

async function loginUsuario(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    //GERANDO O TOKEN JWT
    //Passamndo o ID do usuário dentro do token (payload) para saber quem ele é depois
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '365d' } //Tempo de expiração do token 
    );

    //  o token para o cliente
    return res.json({
      message: 'Login realizado com sucesso!',
      token, //O front vai guardar esse token para usar nas próximas rotas
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao tentar fazer login.' });
  }
}

module.exports = { loginUsuario };