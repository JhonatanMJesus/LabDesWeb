import { Router } from "express";
import TarefaController from "../controllers/TarefaController.js";

const routes = Router();

routes.post("/Create", TarefaController.create);
// routes.get("/getAll", TarefaController.getAll);
routes.delete("/:id", TarefaController.remove);
// routes.get("/:id", TarefaController.getOne);

export default routes;
