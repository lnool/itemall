import path from "path";
import Router from "koa-router";
import multer from "koa-multer";
import { nanoid } from "nanoid";
import UserController from "../controller/user.controller";
import { encrypt } from "../middleware";

const storage = multer.diskStorage({
  destination: (ctx, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (ctx, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const userRouter = new Router({ prefix: "/user" });

// 发送验证码
userRouter.post("/sendCode", UserController.sendCode);

// 注册
userRouter.post(
  "/register",
  upload.single("avatar"),
  encrypt("password"),
  UserController.register
);

// 登陆
userRouter.post("/login", encrypt("password"), UserController.login);

export default userRouter;
