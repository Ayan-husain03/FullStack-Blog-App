import { Router } from "express";
import { createUser, registerUser } from "../controller/userController.js";
import handleError from "../lib/handlerError.js";
import responseHandle from "../lib/responseHandle.js";

const userRouter = Router();
// userRouter.route("/register").post(registerUser);
userRouter.post("/register", registerUser);
userRouter.post("/create", createUser);

export default userRouter;
