import { OrderManagement } from "../service/OrderManagement.service";
import { APIException } from "../util/exeptions/APIexception";
import { IdentifiableOrderItem } from "../model/Iorder";
import { JSONRequestFactory } from "../IMapper";
import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../util/exeptions/http/BadRequestException";

export class OrderController{
    constructor(private readonly OrderServic : OrderManagement){

    }
        ////////////////////////////////////creating order 
         public async createOrder(req:Request,res:Response){
            const order :IdentifiableOrderItem=JSONRequestFactory.create(req.body.category).map(req.body);
            if(!order){
                throw new BadRequestException("Order is required to create an order",{
                    OrderNotFound:true,
                });
            }
            const newOrder =await this.OrderServic.CreateOrder(order);
            res.status(200).json(newOrder);
         }


         //////////////////////////////////geting order
        public async getOrder(req:Request,res:Response){//and this is the type of situationship and the foreah
            
                const id = req.params.id as string;
                if(!id){
                    throw new BadRequestException("id is required",{
                        IdNotFound:true,
                    });
                }
                const order =await  this.OrderServic.getOrder(id);
                res.status(200).json(order);
          
        }

        //////////////////////////////////getting all order
        public async getAllorder(req:Request,res:Response){
                const orders = await this.OrderServic.getAllOrders();
                res.status(200).json(orders);
        }

        /////////////////////////////////updating all the order 
        public async updateOrder(req:Request,res:Response){
          
                const id = req.params.id;
                if(!id){
                    throw new BadRequestException("id is required",{
                        IdNotFound:true,
                    });
                }
                const order:IdentifiableOrderItem = JSONRequestFactory.create(req.body.category).map(req.body);
                if(!order){
                    throw new BadRequestException("Order is required to update Order",{
                        OrderNotFound:true,
                    });

                }
                if(order.getId()!=id){
                    throw new BadRequestException("Id in the body is different than the id provided " ,{
                        IdNotSame:true,
                        idInParam :id,
                        idInBody:order.getId(),
                    })
                }
                const updataedOrder=await this.OrderServic.updateOrder(order);
                return res.status(200).json(updataedOrder);
           
        }


        public async deleteOrder(req:Request,res:Response){
          
            const id = req.params.id as string;
            if(!id){
                throw new BadRequestException("the is required but not provided here for deletion",{
                    IdNotDefined:true,
                });
            }
            await this.OrderServic.deleteOrder(id);
            res.status(200).send();
            
        }
}