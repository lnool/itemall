import Router from "koa-router";
import HomeController from "../controller/home.controller";

const homeRouter = new Router({ prefix: "/home" });

homeRouter.get("/banner", HomeController.findBanner);
homeRouter.get("/recommend", HomeController.findRecommend);

export default homeRouter;
