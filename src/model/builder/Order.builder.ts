import { IidentifiableItem, Iitem } from "../Iitem";
import logger from "../../util/logger";
import { identifiableorderit, Order } from "../Order.model";
import { IdentifiableOrderItem } from "../Iorder";

export class OrderBuilder{
    private item!:Iitem;
    private Quantity!:number;
    private id!:string;
    private price !:number;
    

    public static newOrderBuilder():OrderBuilder{
        return new OrderBuilder();
    }

    setItem(item:Iitem):OrderBuilder{
        this.item=item;
        return this;
    }
    setPrice(price:number):OrderBuilder{
        this.price=price;
        return this;
    }
    setQuantity(Quantity:number):OrderBuilder{
        this.Quantity=Quantity;
        return this;
    }
    setId(id:string):OrderBuilder{
        this.id=id;
        return this;
    }

    build():Order{
        const properties = [this.item,this.id,this.Quantity,this.price];
        for (const prop in properties){
            if (!prop){
                throw new Error("required item not found");
                logger.info("missing an important element");
            }
        }
        return new Order(this.item,this.price,this.id,this.Quantity);
    }


}
export class identifiableOrderBuilder{
    private item!:IidentifiableItem;
    private order!:Order;
    
    static newBuilder():identifiableOrderBuilder{
        return new identifiableOrderBuilder();
    }
    setItem(item:IidentifiableItem):identifiableOrderBuilder{
        this.item=item;
        return this;
    }
    setOrder(order:Order):identifiableOrderBuilder{
        this.order = order;
        return this;
    }

    build():identifiableorderit{
            if (!this.order || !this.item){
                throw new Error("required item not found");
                logger.info("missing an important element");
            }
        
        return new identifiableorderit(this.item,this.order.getPrice(),this.order.getQuantity(),this.order.getId());
    }

}