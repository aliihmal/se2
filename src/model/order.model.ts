import { item } from "./item.model";
export interface Order{
    getItem():item;
    getPrice():number;
    getQuantity():number;
    getId():string;
}