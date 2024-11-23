import express from "express";
import appRouter from "./routers/routers";
import errorHandler from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use("/api", appRouter);
app.use((_req, _res, _next) => {
  throw new Error("Route not found");
});
app.use(errorHandler);
app.listen("3000", () => console.log("server is running"));
