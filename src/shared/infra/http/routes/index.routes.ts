import { Router } from "express";
import clientRoutes from "../../../../modules/clients/infra/http/routes/client.routes";
import categoryRoutes from "../../../../modules/category/infra/http/routes/category.routes";
import productRoutes from "../../../../modules/product/infra/http/routes/product.routes";

const routes = Router();

routes.use("/clientes", clientRoutes);

routes.use("/categorias", categoryRoutes);

routes.use("/produtos", productRoutes);

export default routes;
