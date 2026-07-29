import { ID} from "../repository/IRepository";
import { IidentifiableItem, Iitem } from "./Iitem";
export interface IOrder{
    getItem():Iitem;
    getPrice():number;
    getQuantity():number;
    getId():string;
}

export interface IdentifiableOrderItem extends IOrder, ID{
    getItem():IidentifiableItem;
}