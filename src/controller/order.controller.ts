import { ResultSetHeader, RowDataPacket } from "mysql2";
import GoodsService from "../service/goods.service";
import OrderService from "../service/order.service";
import { Result } from "../utils";

export default class OrderController {
  static async pay(ctx: any) {
    const { id } = ctx.params;
    const { affectedRows } = (await OrderService.pay([id])) as ResultSetHeader;
    ctx.body = affectedRows > 0 ? Result.success("订单支付成功") : Result.fail(400, "订单支付失败");
  }
  static async cancel(ctx: any) {
    const { id } = ctx.params;
    const { affectedRows } = (await OrderService.cancel([id])) as ResultSetHeader;
    ctx.body = affectedRows > 0 ? Result.success("订单取消成功") : Result.fail(400, "订单取消失败");
  }
  static async remove(ctx: any) {
    const { id } = ctx.params;
    const { affectedRows } = (await OrderService.remove(id)) as ResultSetHeader;
    ctx.body = affectedRows > 0 ? Result.success("订单删除成功") : Result.fail(400, "订单删除失败");
  }
  static async findAll(ctx: any) {
    // 获取请求参数
    const { uid, status } = ctx.params;
    // 查询订单
    const orders = (await OrderService.findAll([uid, status])) as RowDataPacket[];
    for (const order of orders) {
      // 解析订单详情
      const [orderDesc] = (await OrderService.findOrderDesc([order.id])) as RowDataPacket[];
      order.orderDesc = orderDesc;
    }
    ctx.body = Result.success(orders);
  }

  static async create(ctx: any) {
    // 获取请求参数
    const { uid, address, info } = ctx.request.body;
    // 生成订单id
    const id = Date.now();
    // 总价
    let totalPrice = 0;
    for (const item of info) {
      // 根据商品的id查询商品
      const [goods] = (await GoodsService.findOne(item.gid)) as RowDataPacket[];
      // 计算总价
      totalPrice += goods.price * item.num;
      // 解析商品图片
      const { img } = JSON.parse(goods.show);
      // 订单详情信息
      const orderDesc = {
        img,
        oid: id,
        title: goods.title,
        num: item.num,
        price: goods.price,
      };
      // 添加订单详情
      await OrderService.createOrderDesc(orderDesc);
    }
    // 订单信息
    const order = { id, totalPrice, uid, address };
    // 添加订单
    const { affectedRows } = (await OrderService.createOrder(order)) as ResultSetHeader;
    ctx.body = affectedRows > 0 ? Result.success("订单添加成功") : Result.fail(400, "订单添加失败");
  }
}
