import { Router } from "express";

import { adminAuth ,
    getUsers,
    logoutAdmin ,
    updateUserDetails,
    deleteUser,
    addUser
} from "../Controllers/adminControllers.js";

const adminRouter = Router();

adminRouter.post('/auth',adminAuth);
 
adminRouter.get("/getUsers",getUsers);

adminRouter.post("/logout",logoutAdmin);
adminRouter.put("/updateUser",updateUserDetails);
adminRouter.put("/deleteUser",deleteUser);
adminRouter.post("/addUser",addUser);





export default adminRouter  ;