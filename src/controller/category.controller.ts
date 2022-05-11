import { Result } from "../utils";
import CategoryService from "../service/category.service";

export default class CategoryController {
  static async findAll(ctx: any) {
    const data = await CategoryService.findAll();
    ctx.body = Result.success(data);
  }
  static async findSubCategory(ctx: any) {
    const { maitKey } = ctx.params;
    const data = await CategoryService.findSubCategory(maitKey);
    ctx.body = Result.success(data);
  }
}
