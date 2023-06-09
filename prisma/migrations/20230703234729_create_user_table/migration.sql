/*
  Warnings:

  - You are about to drop the `Denuncia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Denunciante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Endereco` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Denuncia" DROP CONSTRAINT "Denuncia_denuncianteId_fkey";

-- DropForeignKey
ALTER TABLE "Denuncia" DROP CONSTRAINT "Denuncia_enderecoCepId_fkey";

-- DropTable
DROP TABLE "Denuncia";

-- DropTable
DROP TABLE "Denunciante";

-- DropTable
DROP TABLE "Endereco";

-- CreateTable
CREATE TABLE "denuncia" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "denuncianteId" INTEGER NOT NULL,
    "enderecoCepId" TEXT NOT NULL,

    CONSTRAINT "denuncia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "denunciante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "denunciante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endereco" (
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "pais" TEXT NOT NULL,

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("cep")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "denunciante_cpf_key" ON "denunciante"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "endereco_cep_key" ON "endereco"("cep");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "denuncia" ADD CONSTRAINT "denuncia_denuncianteId_fkey" FOREIGN KEY ("denuncianteId") REFERENCES "denunciante"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "denuncia" ADD CONSTRAINT "denuncia_enderecoCepId_fkey" FOREIGN KEY ("enderecoCepId") REFERENCES "endereco"("cep") ON DELETE CASCADE ON UPDATE CASCADE;
