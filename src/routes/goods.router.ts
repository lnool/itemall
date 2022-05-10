import Router from "koa-router";
import GoodsController from "../controller/goods.controller";

const homeRouter = new Router({ prefix: "/goods" });

homeRouter.get("/", GoodsController.findAll);
homeRouter.get("/:id", GoodsController.findOne);
homeRouter.get("/detail/:iid", GoodsController.findDetail);

export default homeRouter;
