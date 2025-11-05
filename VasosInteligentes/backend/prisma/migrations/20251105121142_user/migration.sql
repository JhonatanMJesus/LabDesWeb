/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `leituras` table. All the data in the column will be lost.
  - You are about to alter the column `perfil` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - You are about to drop the column `nomePlanta` on the `vasos` table. All the data in the column will be lost.
  - Added the required column `nome` to the `vasos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `leituras` DROP COLUMN `criadoEm`,
    ADD COLUMN `criadaEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `usuarios` MODIFY `perfil` ENUM('Admin', 'User') NOT NULL DEFAULT 'User';

-- AlterTable
ALTER TABLE `vasos` DROP COLUMN `nomePlanta`,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL;
