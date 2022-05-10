import { RowDataPacket } from "mysql2";
import { Result } from "../utils";
import GoodsService from "../services/goods.service";

export default class GoodsController {
  static async findAll(ctx: any) {
    const { type = "new", page = 1 } = ctx.query;
    const offset = (page - 1) * 30;
    const data = await GoodsService.findAll([type, offset, 30]);
    ctx.body = Result.success(data);
  }

  static async findOne(ctx: any) {
    const { id } = ctx.params;
    const data = (await GoodsService.findOne(+id)) as RowDataPacket[];
    ctx.body = Result.success(data[0]!);
  }

  static async findDetail(ctx: any) {
    const { iid } = ctx.params;
    const data = (await GoodsService.findDetail(iid)) as RowDataPacket[];
    ctx.body = Result.success(data[0]!);
  }
}
