import { InvalidItemException, ItemNotFoundException } from "../../util/exeptions/repositoryException";
import { Order } from "../../model/Order.model";
import { ID,IRepository } from "../IRepository";
import logger from "../../util/logger";
import { IOrder } from "../../model/Iorder";
import { id } from "../IRepository";
export abstract class OrderRepository implements IRepository<IOrder>{
    protected abstract load():Promise<IOrder[]>;
    protected abstract save(orders:IOrder[]):Promise<void>;// we put (protected) to make sure that only the children can know about those function but cannot use

    async create(item: IOrder): Promise<id> {
         if (!item){
            throw new InvalidItemException("Order can't be null");
         }
        const AllOrders = await this.load();
        const id = AllOrders.push(item);
        await this.save(AllOrders);
        logger.info("succesfully saved the new order of id %d",id);
        return String(id);
    }

    async get(id: id): Promise<IOrder> {
      
        const orders  = await this.load();
        const foundedOrder = orders.find((order)=>order.getId()=== id);
        if (!foundedOrder){
            logger.error("Failed to find the order of id %s",id);
            throw new ItemNotFoundException("Failed to find the item");
        }
        logger.info("found order of id %s",id);
        return foundedOrder;
           
    }

    async getAll(): Promise<IOrder[]> {
        const orders = await this.load();
        logger.info("Retriving %d order" ,orders.length);
        return orders;
    }

    async update(item: IOrder): Promise<void> {
        if (!item){
            
            logger.error("Order cannot be null");
            throw new InvalidItemException("order can't be null");
        }
        const orders = await this.load();
        const index = orders.findIndex((o)=>o.getId()===item.getId());
        if (index ==-1){
            logger.error("Failed to find order of id %s",item.getId());
            throw new ItemNotFoundException("item isn't found ");
        }
        orders[index] = item;
        await this.save(orders);

    }

    async delete(id: id): Promise<void> {
        const orders = await this.load();
        const index = orders.findIndex(o => o.getId() === id);

        if (index === -1) {
            logger.error("Failed to find order of id %s", id);
            throw new ItemNotFoundException("Failed to find the element");
        }

        orders.splice(index, 1);

        await this.save(orders);

        logger.info("Successfully deleted order of id %s", id);
    }

}