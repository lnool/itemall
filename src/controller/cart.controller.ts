import { ResultSetHeader, RowDataPacket } from "mysql2";
import CartService from "../service/cart.service";
import { Result } from "../utils";

export default class CartController {
  static async create(ctx: any) {
    const { uid, gid, num } = ctx.request.body;
    // 查询，同一用户重复商品增加数量
    const [cart] = (await CartService.findExists([uid, gid])) as RowDataPacket[];
    if (cart) {
      const body = { num: cart.num + num };
      // 修改数量
      const { affectedRows } = (await CartService.update([body, cart.id])) as ResultSetHeader;
      ctx.body = affectedRows > 0 ? Result.success("新增成功") : Result.fail(400, "新增失败");
    } else {
      // 新增
      const { affectedRows } = (await CartService.create(ctx.request.body)) as ResultSetHeader;
      ctx.body = affectedRows > 0 ? Result.success("新增成功") : Result.fail(400, "新增失败");
    }
  }
}
