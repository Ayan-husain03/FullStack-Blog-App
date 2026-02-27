import { Router } from "express";
import { registerUser } from "../controller/userController.js";

const userRouter = Router();
// userRouter.route("/register").post(registerUser);
userRouter.post("/register", registerUser);

export default userRouter;
