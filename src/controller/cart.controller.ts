import { ResultSetHeader, RowDataPacket } from "mysql2";
import CartService from "../service/cart.service";
import { Result } from "../utils";

export default class CartController {
  static async update(ctx: any) {
    const { id } = ctx.params;
    const { affectedRows } = (await CartService.update([ctx.request.body, id])) as ResultSetHeader;
    ctx.body = affectedRows > 0 ? Result.success("修改成功") : Result.fail(400, "修改失败");
  }
  static async remove(ctx: any) {
    const { id } = ctx.request.body;
    const { affectedRows } = (await CartService.remove(id.toString())) as ResultSetHeader;
    ctx.body = affectedRows > 0 ? Result.success("删除成功") : Result.fail(400, "删除失败");
  }
  static async findAll(ctx: any) {
    const { uid } = ctx.params;
    const data = await CartService.findAll([uid]);
    ctx.body = Result.success(data);
  }
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
