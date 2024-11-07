import { Router } from "express";
import * as ComprasController from "../controllers/ComprasController"

const routes = Router();

// routes.get("/shops-config", ComprasController.getShopsConfig);

// routes.get("/historico/compra", ComprasController.historico);

routes.get("/cardapio", ComprasController.show);

// routes.get("/shop/", ComprasController.show);

// routes.get("/shop/info/:id", ComprasController.getInfos);

// routes.post("/sell/pacote/to-company", ComprasController.sell);

routes.post("/carrinho/compras", ComprasController.buy);

// routes.delete("/delete/produto/shop/:id", ComprasController.destroy)

// routes.delete("/delete/shop/colab/:id", ComprasController.destroyColab)


export default routes;