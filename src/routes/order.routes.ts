import { NextFunction, Request, Response, Router } from "express";
import { OrderController } from "../controller/order.controller";
import { orderManagement } from "../app";
import { OrderManagement } from "../service/OrderManagement.service";

const orderController = new OrderController(new OrderManagement());
const route = Router();

import asyncHandler from "../middleware/asyncHandeler";
import { hasPermission } from "../middleware/authorize";
import { Permission } from "../config/role";

route.route('/')
        .get(asyncHandler(orderController.getAllorder.bind(orderController)))
        .post(asyncHandler(orderController.createOrder.bind(orderController)));
        
route.route('/:id')     
                .get(hasPermission(Permission.READ_ORDER),asyncHandler(orderController.getOrder.bind(orderController)))
                .put(hasPermission(Permission.UPDATE_ORDER),asyncHandler(orderController.updateOrder.bind(orderController)))
                .delete(hasPermission(Permission.DELETE_ORDER),asyncHandler(orderController.deleteOrder.bind(orderController)));
// and we are 
export default route;