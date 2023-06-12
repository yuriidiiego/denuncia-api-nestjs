-- DropForeignKey
ALTER TABLE "Denuncia" DROP CONSTRAINT "Denuncia_denuncianteId_fkey";

-- DropForeignKey
ALTER TABLE "Denuncia" DROP CONSTRAINT "Denuncia_enderecoCepId_fkey";

-- AddForeignKey
ALTER TABLE "Denuncia" ADD CONSTRAINT "Denuncia_denuncianteId_fkey" FOREIGN KEY ("denuncianteId") REFERENCES "Denunciante"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Denuncia" ADD CONSTRAINT "Denuncia_enderecoCepId_fkey" FOREIGN KEY ("enderecoCepId") REFERENCES "Endereco"("cep") ON DELETE CASCADE ON UPDATE CASCADE;
