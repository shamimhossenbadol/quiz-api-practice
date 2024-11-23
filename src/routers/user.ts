import { Router } from "express";
import verifyAuth from "../middlewares/verifyAuth";
import { userCtrl } from "../controllers/user";

const protectedRouters = Router();
protectedRouters.post("/update-user", verifyAuth, userCtrl.updateUser);
protectedRouters.delete("/delete-user", verifyAuth, userCtrl.deleteUser);
export default protectedRouters;
