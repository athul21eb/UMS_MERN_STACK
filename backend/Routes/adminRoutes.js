import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
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
 
adminRouter.get("/getUsers",verifyJWT,getUsers);
adminRouter.get('/refresh',refreshAdmin)
adminRouter.post("/logout",logoutAdmin);
adminRouter.put("/updateUser",verifyJWT,updateUserDetails);
adminRouter.put("/deleteUser",verifyJWT,deleteUser);
adminRouter.post("/addUser",verifyJWT,addUser);





export default adminRouter  ;