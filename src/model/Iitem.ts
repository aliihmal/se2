import { ID } from "../repository/IRepository";

export interface Iitem{
    getCategory():itemCategory;
}
export enum itemCategory{
    CAKE="cake",
}

export interface IidentifiableItem extends Iitem, ID { 
}