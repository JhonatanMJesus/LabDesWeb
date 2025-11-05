// src/routes/authRoutes.ts
import { Router } from 'express';
import { login, register, logout} from '../controllers/authController';
import {authenticateToken, AuthRequest} from "../middlewares/authMiddleware";
import { Response } from 'express';

const router = Router();

router.post('/register', register); 
router.post('/login', login);
router.post('/logout', logout); 
router.post('/me', authenticateToken, (req:AuthRequest, res:Response)=>{
    res.status(200).json({message:"Usuário Autenticado", authenticated:true, user:req.user})
});

export default router;