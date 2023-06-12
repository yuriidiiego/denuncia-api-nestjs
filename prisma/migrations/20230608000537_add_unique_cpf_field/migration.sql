/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Denunciante` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Denunciante_cpf_key" ON "Denunciante"("cpf");
