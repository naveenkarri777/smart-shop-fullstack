import express from "express";
import { RegisterUser,LoginUser, AdminLogin} from '../controller/userController.js'

const userRouter = express.Router();

// Public routes
userRouter.post("/register",RegisterUser);
userRouter.post("/login", LoginUser);
userRouter.post("/adminlogin",AdminLogin);

export default userRouter;
