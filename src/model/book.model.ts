import {Iitem} from "./Iitem"
import { itemCategory } from "./Iitem";
export class bookOrder implements Iitem{
    order_id:number;
    book_title:string;
    Author:string;
    Language: string;
    genre:string;
    format:string;
    publisher:string;
    special_edition:string;
    packaging:string;
    price: number;     
  quantity: number; 
  constructor(id:number,book_title:string,Authore:string,Lang:string
    ,genre:string,format:string,publisher:string,special_edition:string
    ,packaging:string,price:number,quantity:number
  ){
    this.order_id= id;
    this.book_title= book_title;
      this.Author=Authore;
      this.Language=Lang;
      this.genre= genre;
      this.format=format;
      this.publisher=publisher;
      this.special_edition= special_edition;
      this.packaging=packaging;
      this.price=price
      this.quantity=quantity
  }
  getCategory(){
    return itemCategory.BOOK;
  }
}