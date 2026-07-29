import { IidentifiableItem, Iitem } from "./Iitem";
import { IdentifiableOrderItem, IOrder } from "./Iorder";

export class Order implements IOrder{

    private item:Iitem;
    private price :number;
    private id:string;
    private Quantity:number;
          


    constructor(item:Iitem,price:number,id:string,Quantity:number){
        this.item= item
        this.price= price;
        this.id=id;
        this.Quantity= Quantity;
    }
    getItem(): Iitem {
        return this.item;
    }
    getPrice(): number {
        return this.price

    }
    getQuantity(): number {
        return this.Quantity
    }
    getId(): string {
        return this.id;
    }
    
}

export class identifiableorderit  implements IdentifiableOrderItem{
    constructor(private indetifiableItem : IidentifiableItem,private price : number,private quantity:number,private id:string){

    }
    getPrice(): number {
       return this.price;
    }
    getQuantity(): number {
        return this.quantity;
    }
    getId(): string {
        return this.id
    }
    getItem(): IidentifiableItem {
       return this.indetifiableItem;
    }
    
}
