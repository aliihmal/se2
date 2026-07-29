import { identifiableOrderBuilder, OrderBuilder } from "../model/builder/Order.builder";
import { Order } from "../model/Order.model"
import { IMapper } from "./IMapper";
import { Cake } from "../model/cake.model";
import { IidentifiableItem, Iitem } from "../model/Iitem";
import { IdentifiableOrderItem, IOrder } from "../model/Iorder";

export class CSVOrderMapper implements IMapper<string[],IOrder>{
    constructor(private itemMapper:IMapper<string[],Iitem>){

    }
    reverseMap(data: IOrder): string[] {
        const item = this.itemMapper.reverseMap(data.getItem());
        return [
            data.getQuantity().toString(),
            data.getId(),
           data.getPrice().toString(),
            ...item,
        ]
    }
    map(data: string[]): IOrder {
        const item :Iitem= this.itemMapper.map(data);
       return OrderBuilder.newOrderBuilder()
       .setId(data[0])
       .setQuantity(parseInt(data[data.length-1]))
       .setPrice(parseInt(data[data.length- 2]))
       .setItem(item)
       .build();
    }

}

export interface SQLiteOrder{
    id:string;
    quantity:number;
    price:number;
    item_category:string;
    item_id:string;
}
export class SQLOrderMapper implements IMapper<{data:SQLiteOrder,item:IidentifiableItem},IdentifiableOrderItem>{
    
    reverseMap(order: IdentifiableOrderItem): { data: SQLiteOrder; item: IidentifiableItem; } {
        return{
            data:
                {       id:order.getId(),
                        quantity:order.getQuantity(),
                        price:order.getPrice(),
                        item_id:order.getItem().getId(),
                        item_category:order.getItem().getCategory(),
                },
                item:order.getItem(),
        }
    }
    
    map({data,item}:{data:SQLiteOrder,item:IidentifiableItem}): IdentifiableOrderItem {
        const order = OrderBuilder.newOrderBuilder().setItem(item).setId(data.id).setPrice(data.price).setQuantity(data.quantity).build();
        return identifiableOrderBuilder.newBuilder().setOrder(order).setItem(item).build();
    }

}

export class JSONRequestOrderMapper implements IMapper<any,IdentifiableOrderItem>{
    constructor(private readonly itemMapper:IMapper<any,IidentifiableItem>){

    }
    map(data: any): IdentifiableOrderItem {
        try{
        if (!data.item){
            throw new Error("item is required");
        }
        const item =  this.itemMapper.map(data.item);
        const order = OrderBuilder.newOrderBuilder().setId(data.id).setPrice(data.price).setQuantity(data.quantity).setItem(item).build();
        return identifiableOrderBuilder.newBuilder().setItem(item).setOrder(order).build();

        }catch(error){
            throw new Error("error while mapping the json data into object data");
        }
    }
    reverseMap(data: IdentifiableOrderItem) {
        throw new Error("Method not implemented.");
    }
}