import { Result } from "./../utils";
import HomeService from "../service/home.service";

export default class HomeController {
  static async findRecommend(ctx: any) {
    const data = await HomeService.findRecommend();
    ctx.body = Result.success(data);
  }

  static async findBanner(ctx: any) {
    const data = await HomeService.findBanner();
    ctx.body = Result.success(data);
  }
}
