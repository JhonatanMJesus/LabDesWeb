import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/authMiddleware';

const prisma = new PrismaClient();

// Registrar vaso
export const inserirVaso = async (req: AuthRequest, res: Response) => {
  try {
    const { nome, descricao } = req.body;
    const usuarioId = Number(req.user?.id);

    // Validação
    if (!nome || !descricao || isNaN(usuarioId) || usuarioId <= 0) {
      return res.status(400).json({ message: "Todos os campos de texto e o ID do usuário são obrigatórios." });
    }

    const fotoUrl = req.file ? `/uploads/${req.file.filename}` : null;
    if (!req.file) {
        return res.status(400).json({ message: "A imagem do vaso é obrigatória." });
    }
    // Criar o vaso no banco
    const novoVaso = await prisma.vaso.create({
      data: {
        nome,
        descricao,
        fotoUrl,
        usuarioId,
      },
    });

    return res.status(201).json({
      message: "Vaso inserido com sucesso",
      vaso: novoVaso,
    });

  } catch (error) {
    console.error("Erro ao cadastrar vaso:", error);
    return res.status(500).json({ message: "Tente mais tarde!!" });
  }
};

// Buscar vasos do usuário logado
export const buscarVasosDoUsuario = async (req: AuthRequest, res: Response) => {
  const usuarioId = req.user!.id;

  try {
    const vasos = await prisma.vaso.findMany({
      where: { usuarioId },
    });

    return res.status(200).json(vasos);
  } catch (error) {
    console.error("Erro ao buscar vasos:", error);
    return res.status(500).json({ message: "Erro ao buscar vasos." });
  }
};

// Deletar vaso do usuário
export const deletarVasosDoUsuario = async (req: AuthRequest, res: Response) => {
  const vasoId = Number(req.params.id);
  const usuarioId = req.user!.id;

  if (isNaN(vasoId)) {
    return res.status(400).json({ message: "ID inválido." });
  }

  try {
    const vaso = await prisma.vaso.findFirst({
      where: {
        id: vasoId,
        usuarioId,
      },
    });

    if (!vaso) {
      return res.status(404).json({ message: "Vaso não encontrado ou não pertence ao usuário." });
    }

    await prisma.vaso.delete({
      where: { id: vasoId },
    });

    return res.status(200).json({ message: "Vaso deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar vaso:", error);
    return res.status(500).json({ message: "Tente novamente mais tarde." });
  }
};
