import { Router } from "express";
import { userController } from "../controller/user.controller";
import { UserRepository } from "../repository/sqlite/user.repository";
import { UserManager } from "../service/UserManagement.servic";

import asyncHandler from "../middleware/asyncHandeler";
const usercontroller = new userController(
    new UserManager()
);
const route = Router();
route.route("/:id")
        .get(asyncHandler(usercontroller.getUser.bind(usercontroller)))
        .put(asyncHandler(usercontroller.updateUser.bind(usercontroller)))
        .delete(asyncHandler(usercontroller.deleteUser.bind(usercontroller)));
route.route("/")
        .get(asyncHandler(usercontroller.getAllUser.bind(usercontroller)))
        .post(asyncHandler(usercontroller.CreateUser.bind(usercontroller)));

export default route;