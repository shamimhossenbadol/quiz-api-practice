import { Router } from "express";
import authRouters from "./auth";
import userRouters from "./user";
import questionRouters from "./question";

const routers = [
  { path: "/auth", router: authRouters },
  { path: "/user", router: userRouters },
  { path: "/questions", router: questionRouters },
];
const appRouter = Router();
routers.forEach((router) => {
  appRouter.use(router.path, router.router);
});
export default appRouter;
