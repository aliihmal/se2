import { ID } from "../repository/IRepository";

export interface Iitem{
    getCategory():itemCategory;
}
export enum itemCategory{
    CAKE="cake",
    BOOK="book"
}

export interface IidentifiableItem extends Iitem, ID { 
}