import { Router } from "express";
import {
  googleLogin,
  login,
  registerUser,
} from "../controller/userController.js";

// console.log("User Router Loaded");
const userRouter = Router();
userRouter.get("/check", (req, res) => {
  res.send("USER ROUTER WORKING");
});
// userRouter.route("/register").post(registerUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", login);
userRouter.post("/google", googleLogin);

export default userRouter;
