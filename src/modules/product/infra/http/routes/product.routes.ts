import { Router } from "express";
import ProductController from "../controllers/ProductController";

const routes = Router();

/**
 * Define todas as rotas de Produtos
 */

routes.post("/", ProductController.create);

routes.get("/", ProductController.list);

routes.get("/:id", ProductController.findById);

routes.put("/:id", ProductController.update);

routes.delete("/:id", ProductController.delete);

export default routes;
