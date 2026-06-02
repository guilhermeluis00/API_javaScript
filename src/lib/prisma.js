// src/lib/prisma.js
const { PrismaClient } = require('../generated'); // Um único '../' sai de lib e acha generated em src

const prisma = new PrismaClient();

module.exports = prisma;