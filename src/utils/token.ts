import jwt from "jsonwebtoken";

/** 获取token */
function getToken(palyload: any) {
  // 生成token palyload 参数 "密钥"
  return jwt.sign(palyload, "itemall");
}

/** 解析token */
function verifyToken(token: string) {
  return jwt.verify(token, "itemall");
}

export { getToken, verifyToken };
