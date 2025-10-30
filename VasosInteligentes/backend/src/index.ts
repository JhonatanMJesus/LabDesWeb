import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

app.use(express.json());

app.use(cookieParser());

app.use("/api", authRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});