import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';

const app = new express();

//Fazer troca de mensagens entre backend e frontend
app.use(express.json())

//cors comunicação entre duas aplicações que rodam em portas diferentes
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

app.use("/todo", routes);
//Porta que o backend executará
app.listen(5000);
