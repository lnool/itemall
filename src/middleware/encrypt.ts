import md5 from "md5";

/** 密码加密中间件 */
export function encrypt(filed: string) {
  return async (ctx: any, next: () => void) => {
    if (ctx.req.body) {
      ctx.req.body[filed] = md5(ctx.req.body[filed]);
    }

    // Object.entries Object => Array
    if (Object.entries(ctx.request.body).length > 0) {
      ctx.request.body[filed] = md5(ctx.request.body[filed]);
    }

    await next();
  };
}
