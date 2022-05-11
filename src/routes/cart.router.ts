import Router from "koa-router";
import CartController from "../controller/cart.controller";
import { auth } from "../middleware";

const cartRouter = new Router({ prefix: "/cart" });

cartRouter.post("/", auth(), CartController.create);

export default cartRouter;
