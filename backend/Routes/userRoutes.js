import {
    Auth, 
    registerUser, 
    logoutUser,
     getUserProfile,
      updateUserProfile,
      refresh
} from "../Controllers/userControllers.js";

import { protect } from "../middleware/authMiddleware.js";

import { Router } from "express"
const userRouter = Router();

userRouter.post("/",registerUser);
userRouter.post("/auth",Auth);
userRouter.post('/refresh',refresh)

userRouter.post("/logout",logoutUser);
userRouter.get("/profile",protect,getUserProfile)
            .put("/profile",protect,updateUserProfile);


export default userRouter