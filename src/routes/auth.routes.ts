import { Router } from "express";
import { userController } from "../controller/user.controller";
import { UserRepository } from "../repository/sqlite/user.repository";
import { UserManager } from "../service/UserManagement.servic";

import asyncHandler from "../middleware/asyncHandeler";
import { AuthenticationService } from "../service/Authentication.service";
import { AuthController } from "../controller/auth.controller";
import { authenticate } from "../middleware/auth";



const route = Router();

const autheService = new AuthenticationService();
const userservice = new UserManager();
const userconstroller = new userController(userservice);


const authControler = new AuthController(autheService,userservice);


route.route("/login")
            .post(asyncHandler(authControler.login.bind(authControler)));
route.route("/logout")
            .get(authenticate,authControler.logout.bind(authControler))
export default route;