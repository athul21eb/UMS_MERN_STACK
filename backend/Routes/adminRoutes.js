import { Router } from "express";
import { AdminVerifyJWT } from "../middleware/verifyJWT.js";
import { adminAuth ,
    getUsers,
    logoutAdmin ,
    updateUserDetails,
    deleteUser,
    addUser,
    refreshAdmin
} from "../Controllers/adminControllers.js";

const adminRouter = Router();

adminRouter.post('/auth',adminAuth);
 
adminRouter.get("/getUsers",AdminVerifyJWT,getUsers);
adminRouter.get('/refresh',refreshAdmin)
adminRouter.post("/logout",logoutAdmin);
adminRouter.put("/updateUser",AdminVerifyJWT,updateUserDetails);
adminRouter.put("/deleteUser",AdminVerifyJWT,deleteUser);
adminRouter.post("/addUser",AdminVerifyJWT,addUser);





export default adminRouter  ;