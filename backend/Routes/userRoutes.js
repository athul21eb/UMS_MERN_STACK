import {
    Auth, 
    registerUser, 
    logoutUser,
     getUserProfile,
      updateUserProfile,
      refresh
} from "../Controllers/userControllers.js";



import { Router } from "express"
import { verifyJWT } from "../middleware/verifyJWT.js";
const userRouter = Router();

userRouter.post("/",registerUser);
userRouter.post("/auth",Auth);
userRouter.get('/refresh',refresh)

userRouter.post("/logout",logoutUser);
userRouter.get("/profile",verifyJWT,getUserProfile)
            .put("/profile",verifyJWT,updateUserProfile);


export default userRouter