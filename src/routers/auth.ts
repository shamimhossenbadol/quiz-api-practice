import { Router } from "express";
import { authCtrl } from "../controllers/auth";

const authRouters = Router();
authRouters.post("/sign-up", authCtrl.signUp);
authRouters.post("/log-in", authCtrl.logIn);
export default authRouters;
