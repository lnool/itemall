import { Result, verifyToken } from "../utils";

/** 验证授权中间件 */
export function auth() {
  return async (ctx: any, next: () => any) => {
    try {
      const token = ctx.request.headers["authorization"] as string;

      const result = verifyToken(token);
      if (result) {
        await next();
      } else {
        ctx.body = Result.fail(401, "未授权");
      }
    } catch (error) {
      console.log(error);

      ctx.body = Result.fail(401, "未授权");
    }
  };
}
