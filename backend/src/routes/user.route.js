import { Router } from "express";
import {  login, registerUser } from "../controller/userController.js";

const userRouter = Router();
// userRouter.route("/register").post(registerUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", login);

export default userRouter;
