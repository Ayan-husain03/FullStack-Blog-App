import { Router } from "express";
import {
  googleLogin,
  login,
  registerUser,
} from "../controller/userController.js";

const userRouter = Router();
// userRouter.route("/register").post(registerUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", login);
userRouter.post("/google", googleLogin);

export default userRouter;
