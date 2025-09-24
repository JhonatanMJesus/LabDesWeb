import { Router } from "express";
import TarefaController from "../controllers/TarefaController.js";

const routes = Router();

routes.post("/Create", TarefaController.create);
routes.get("/getAll", TarefaController.getAll);
routes.delete("/:id", TarefaController.remove);
routes.get("/:id", TarefaController.getOne);
routes.put("/:id", TarefaController.updateCompleto);
routes.patch("/:id", TarefaController.updateParcial);

export default routes;
