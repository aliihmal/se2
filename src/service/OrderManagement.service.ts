import { Order } from "../model/Order.model";
import { ServiceException } from "../util/exeptions/ServiceException";
import { generateUUID } from "../util";
import {  RepositoryFactory } from "../repository/Repository.factory";
import config from "../config";
import { itemCategory } from "../model/Iitem";
import { orderManagement } from "../app";
import { IdentifiableOrderItem } from "../model/Iorder";
import { IRepository } from "../repository/IRepository";
import { NotFoundException } from "../util/exeptions/http/NotFoundExecption";
import { BadRequestException } from "../util/exeptions/http/BadRequestException";
export class OrderManagement{
    //getting the intended  repository(avoid repetation) 
    private async getRepo(category:itemCategory): Promise<IRepository<IdentifiableOrderItem>>{
             return  RepositoryFactory.create(config.dbMode,category);
    }
    //order validation (avoid repetation)
    private validateOrder(order:IdentifiableOrderItem):void{
        if (!order.getItem()|| order.getPrice()<0 || order.getQuantity()<0){
            const details = {
                ItemNotFound:!order.getItem(),
                PriceNegative :order.getPrice()<=0,
                QuantityNegative:order.getQuantity()<=0
            }
            throw new BadRequestException("Invalid Order : item ,price , quantity",details);
        }
    }
      // create Order
    public async CreateOrder(order:IdentifiableOrderItem):Promise<IdentifiableOrderItem>{
        this.validateOrder(order);
        const id = generateUUID("order");
        const repo = await RepositoryFactory.create(config.dbMode,order.getItem().getCategory());
        await repo.create(order);
        return order;
    }
    // getting order by an id 
    public async getOrder(id:string):Promise<IdentifiableOrderItem>{
        const categories =Object.values(itemCategory);
        for (const category of categories){
            try{
                const repo = await   this.getRepo(category);
                const order =await repo.get(id);
                return order;
            }catch(error){
                
            }
            
        }
        throw new NotFoundException("Order with id "+id+"Not found");
    }
    // update order by id 
    public async updateOrder(order:IdentifiableOrderItem):Promise<void>{
        this.validateOrder(order);
        const repo = await RepositoryFactory.create(config.dbMode,order.getItem().getCategory());
        await repo.update(order);
    }

     //delete order by id 
    public async deleteOrder(id:string):Promise<void>{
        const categories =Object.values(itemCategory);
        for (const category of categories){
            const repo = await this.getRepo(category);
            const order =await repo.get(id);
            if(order){
                await repo.delete(id);
                return;
            }
        }
        throw new NotFoundException("Order with id "+id+"Not found");
    }
    // getting all orders 
    public async getAllOrders():Promise<IdentifiableOrderItem[]>{
        const categories  = Object.values(itemCategory);
        const allOrders :IdentifiableOrderItem[] =[];
        for (const category of categories){
            const repo = await this.getRepo(category);
            const orders =await repo.getAll();
            allOrders.push(...orders);
        }
        return allOrders;
    }
    //getting the number of orders 
    public async getTotalOrders():Promise<number>{
        const orders = await this.getAllOrders();
        return orders.length;
        
    }
    // get all the revenue
    public async getAllRevenue():Promise<number>{
        const orders = await this.getAllOrders();
        const revenue = orders.map((order)=>order.getQuantity()*order.getPrice());
        let total =0 ; 
        for (const rev of revenue){
            total+=rev;
        }
        return total;
    }
    
}


