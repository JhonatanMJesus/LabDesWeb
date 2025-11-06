import { Router } from 'express';
import { inserirVaso, buscarVasosDoUsuario, deletarVasosDoUsuario} from '../controllers/vasoController';
import {authenticateToken, AuthRequest} from "../middlewares/authMiddleware";
import { Response } from 'express';
import { upload } from "../middlewares/upload";

const router = Router();

router.post('/create', authenticateToken, upload.single('foto'), inserirVaso); 
router.get('/findAll', authenticateToken, buscarVasosDoUsuario);
router.delete('/:id', authenticateToken, deletarVasosDoUsuario);

export default router;