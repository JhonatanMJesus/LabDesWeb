import Tarefa from "../models/Tarefa.js";
import { Types } from "mongoose";

export default class TarefaController
{
    static async create(req, res)
    {
        const {titulo, descricao, dataLimite, situacao} = req.body;

        if(!titulo)
        {
            return res.status(422).json({message: "Título é obrigatório"});
        }
        if(!descricao)
        {
            return res.status(422).json({message: "Descricao é obrigatória"});
        }
        if(!dataLimite)
        {
            return res.status(422).json({message: "Data limite é obrigatória"});
        }
        if(!situacao)
        {
            return res.status(422).json({message: "Situacao é obrigatória"});
        }

        const tarefa = new Tarefa({
            titulo,
            descricao,
            dataLimite,
            situacao
        });
        try
        {
            const novaTarefa = await tarefa.save();
            res.status(200).json({message: "Tarefa inserida com sucesso"}, novaTarefa);
        }
        catch
        {
            
        }
    }
}