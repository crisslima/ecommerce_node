import { Router } from "express";
import ClientController from "../controllers/ClientController";

const routes = Router();

/**
 * Define todas as rotas de clientes
 */

routes.post("/", ClientController.create);

routes.get("/", ClientController.list);

routes.get("/:id", ClientController.findById);

routes.put("/:id", ClientController.update);

routes.delete("/:id", ClientController.delete);

export default routes;
