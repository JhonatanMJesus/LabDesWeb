-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `perfil` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vasos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomePlanta` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `fotoUrl` VARCHAR(191) NULL,
    `usuarioId` INTEGER NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leituras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vasoId` INTEGER NOT NULL,
    `umidade` DOUBLE NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vasos` ADD CONSTRAINT `vasos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leituras` ADD CONSTRAINT `leituras_vasoId_fkey` FOREIGN KEY (`vasoId`) REFERENCES `vasos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
