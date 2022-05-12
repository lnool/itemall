import Router from "koa-router";
import CartController from "../controller/cart.controller";
import { auth } from "../middleware";

const cartRouter = new Router({ prefix: "/cart" });
// 新增购物车
cartRouter.post("/", auth(), CartController.create);
// 查询购物车列表
cartRouter.get("/:uid", auth(), CartController.findAll);
// 删除购物车
cartRouter.delete("/", auth(), CartController.remove);
// 修改购物车
cartRouter.put("/:id", auth(), CartController.update);

export default cartRouter;
