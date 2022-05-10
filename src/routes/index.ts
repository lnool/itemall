import Koa from "koa";
import * as path from "path";
import * as fs from "fs";

export function setupRoutes(app: Koa) {
  // 获取当前目录下的除index.ts的所有文件
  const allFiles = fs.readdirSync(__dirname).filter((_) => _ !== "index.ts");

  // 加载文件中默认模块
  allFiles.forEach(async (_) => {
    // 加载模块
    const module = await import(path.join(__dirname, _));
    // 使用模块
    app.use(module.default.routes());
  });
}
