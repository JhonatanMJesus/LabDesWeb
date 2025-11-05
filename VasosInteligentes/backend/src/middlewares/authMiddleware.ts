import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


// Interface estendida para injetar o usuário no Request


const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-muito-forte';
export interface AuthRequest extends Request {
    user?: {
        id: number;
        perfil: 'Admin' | 'User';
        email: string;
    };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1. Obter o token do COOKIE 'jwt'
    const token = req.cookies.jwt; 

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Necessário estar logado.' });
    }

    try {
        // 2. Verificar e Decodificar o Token
        const decoded = jwt.verify(token, JWT_SECRET) as { 
            id: number; 
            perfil: 'Admin' | 'User'; 
            email: string;
        };

        // 3. Anexar o payload do usuário
        req.user = decoded; 

        next();
        
    } catch (err) {
        // Token inválido/expirado: limpa o cookie
        res.clearCookie('jwt'); 
        return res.status(403).json({ message: 'Sessão inválida ou expirada. Faça login novamente.' });
    }
};

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.perfil !== 'Admin') {
        return res.status(403).json({ message: 'Proibido. Apenas administradores podem realizar esta ação.' });
    }
    next();
};