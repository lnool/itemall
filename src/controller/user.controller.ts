import { getToken, Result } from "../utils";
import UserService from "../service/user.service";
import { RowDataPacket } from "mysql2";

export default class UserController {
  static async login(ctx: any) {
    const { phone, password } = ctx.request.body;
    // 1.根据手机号查询 用户不存在
    const [user] = (await UserService.findUserByPhone(
      phone
    )) as RowDataPacket[];
    if (!user?.id) {
      ctx.body = Result.fail(400, "用户不存在");
    } else {
      // 2. 验证密码
      if (user.password !== password) {
        ctx.body = Result.fail(400, "密码错误");
      }
      // 删除密码
      delete user.password;
      //  3. 登录成功 颁发token
      const token = getToken({ phone: user.phone, id: user.id });
      ctx.body = Result.success({ token, user });
    }
  }
  static async register(ctx: any) {
    // 验证手机号是否注册过
    const user = (await UserService.findUserByPhone(
      ctx.req.body.phone
    )) as RowDataPacket[];

    if (user.length > 0) {
      ctx.body = Result.fail(400, "手机号已注册");
    } else {
      ctx.req.body.avatar =
        "http://localhost:3000/uploads/" + ctx.req.file.filename;
      const { affectedRows } = (await UserService.register(
        ctx.req.body
      )) as any;
      ctx.body =
        affectedRows > 0
          ? Result.success("注册成功")
          : Result.fail(400, "注册失败");
    }
  }
  static async sendCode(ctx: any) {
    const { phone } = ctx.request.body;
    // 手机号码正则
    if (/^1[3456789]\d{9}$/.test(phone)) {
      const code = Math.floor(Math.random() * 9000) + 1000 + "";
      const isSuccess = await UserService.sendCode(phone, code);
      if (isSuccess) {
        ctx.body = Result.success(code);
      } else {
        ctx.body = Result.fail(400, "短信发送频繁");
      }
    } else {
      ctx.body = Result.fail(400, "手机号码格式不正确");
    }
  }
}
