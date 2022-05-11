import Router from "koa-router";
import CategoryController from "../controller/category.controller";

const categoryRouter = new Router({ prefix: "/category" });

categoryRouter.get("/", CategoryController.findAll);
categoryRouter.get("/subcategory/:maitKey", CategoryController.findSubCategory);

export default categoryRouter;
