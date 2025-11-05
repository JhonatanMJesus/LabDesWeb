import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client'; 
import * as argon2 from 'argon2'; 
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "sua-chave-super-secreta-muito-forte";
const JWT_EXPIRATION_MS = 24*60*60*1000; //24h

//registrar
export const register = async(req:Request, res:Response)=>{
    const {nome, email, senha, perfil} = req.body;

    //validar
    if(!nome || !email || !senha || !perfil){
        return res.status(400).json({message:"Todos os campos são obrigatórios e a senha deve ter no mínimo 6 caracteres."});
    }
    try{
        const hashedPassword = await argon2.hash(senha);
        const novoUsuario = await prisma.usuario.create({
            data:{
                nome,
                email,
                senha: hashedPassword,
                perfil
            },
            select:{id:true, nome:true, email:true, perfil:true, criadoEm:true}
        });
        //geração token caso faça automaticamente o login do usuário que se cadastrou
        return res.status(200).json({message:"Usuário inserido com sucesso"})
    }   
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(409).json({message:"Usuário já cadastrado"});
        }
        console.error("Erro ao cadastrar usuário", error);
        return res.status(500).json({message:"Tente mais tarde!!"});

    }
};
export const login = async(req:Request, res:Response)=>{
    const {email, senha} = req.body;
    if(!email || !senha)
    {
        return res.status(400).json({message:"Credenciais inválidas"});
    }

    try{
        const usuario = await prisma.usuario.findUnique({where:{email}});
        if(!usuario)
        {
            return res.status(400).json({message:"Credenciais inválidas"});
        }
        const senhaCorreta = await argon2.verify(usuario.senha, senha);
        if(!senhaCorreta){
            return res.status(400).json({message:"Credenciais inválidas"});
        }
        const tokenPayload = {
            id:usuario.id,
            perfil:usuario.perfil,
            email:usuario.email
        }
        const token = jwt.sign(tokenPayload, JWT_SECRET,{expiresIn:"1h"});

        res.cookie("jwt", token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge: JWT_EXPIRATION_MS
        });
        return res.status(200).json({
            message:"Login com sucesso",
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil
            },
            token: token})
    }
    catch(error){
        console.log("Erro no processo login", error);
        return res.status(500).json({message:"Tente mais tarde"});
    }
};
export const logout = async(req:Request, res:Response)=>{
    res.clearCookie("jwt");
    return res.status(200).json({message:"Logout com sucesso"});
};