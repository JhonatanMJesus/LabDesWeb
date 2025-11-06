import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
//importar as rotas
import authRoutes from "./routes/authRoutes";
import vasoRoutes from "./routes/vasoRoutes";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api", authRoutes);
app.use("/api", vasoRoutes);
app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT} `)
});