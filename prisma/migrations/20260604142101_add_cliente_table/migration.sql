-- CreateTable
CREATE TABLE "Clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "email" TEXT,
    "adrress" TEXT,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);
