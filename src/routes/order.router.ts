import Router from "koa-router";
import OrderController from "../controller/order.controller";
import { auth } from "../middleware";

const orderRouter = new Router({ prefix: "/order" });
// 新增
orderRouter.post("/", auth(), OrderController.create);
// 查询
orderRouter.get("/:uid/:status", auth(), OrderController.findAll);

// 删除
orderRouter.delete("/:id", auth(), OrderController.remove);

// 取消
orderRouter.post("/cancel/:id", auth(), OrderController.cancel);
// 支付
orderRouter.post("/pay/:id", auth(), OrderController.pay);

export default orderRouter;

/**
 *  逻辑删除 修改某一个字段 isDel = ture flase
 *  物理删除 DELETE FROM `order` WHERE id = ?
 */
