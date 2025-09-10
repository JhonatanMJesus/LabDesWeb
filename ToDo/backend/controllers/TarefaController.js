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
        catch(error)
        {
            res.status(500).json({message: "Problema ao inserir a tarefa.", error})
        }
    }

    static async remove(req, res)
    {
        const id = req.params.id;
        const ObjectId = Types.ObjectId;
        if(!ObjectId.isValid(id))
        {
            return res.status(422).json({message: "ID Inválido"});
        }
        try
        {
            const tarefa = await Tarefa.findOne({ _id:id });
            if(!tarefa)
            {
                return res.status(404).json({message: "Tarefa não encontrada!"})
            }
            await Tarefa.findByIdAndDelete(id);
            res.status(200).json({message: "Tarefa removida com sucesso!"})
        }
        catch(error)
        {
            res.status(500).json({message: "Problema ao remover a tarefa.", error})
        }
    }

    static async getAll(req, res)
    {
        try
        {
            const tarefas = await Tarefa.find();
            res.status(200).json(tarefas);
        }
        catch(error)
        {
            res.status(500).json({message: "Problema ao buscar as tarefas.", error});
        }
    }

    static async getOne(req, res)
    {
        const id = req.params.id;
        const ObjectId = Types.ObjectId;
        if(!ObjectId.isValid(id))
        {
            return res.status(422).json({message: "ID Inválido"});
        }
        try
        {
            const tarefa = await Tarefa.findOne({ _id:id });
            if(!tarefa)
            {
                return res.status(404).json({message: "Tarefa não encontrada!"})
            }
            res.status(200).json(tarefa);
        }
        catch(error)
        {
            res.status(500).json({message: "Problema ao buscar a tarefa.", error});
        }
    }
}