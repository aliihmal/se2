import { bookOrder } from "../book.model";
import { Cakebuilder } from "./cake.builder";

export class bookBuilder{
    private order_id!:number;
    private book_title!:string;
    private Author!:string;
    private Language!: string;
    private genre!:string;
    private format!:string;
    private publisher!:string;
    private special_edition!:string;
    private packaging!:string;
    private price!: number;     
    private quantity!: number;
    
   
     public static newBookBuilder():bookBuilder{
        return new bookBuilder();
     }
    setQuantity(quantity:number):bookBuilder{
        this.quantity= quantity;
        return this ;
    }

    setPrice(price:number):bookBuilder{
        this.price= price;
        return this ;
    }
    setPackaging(packaging:string):bookBuilder{
        this.packaging= packaging;
        return this ;
    }
    setSpecial_Edition(SE:string):bookBuilder{
        this.special_edition= SE;
        return this ;
    }

    setpublisher(publisher:string):bookBuilder{
        this.publisher= publisher;
        return this ;
    }
    setformat(format:string):bookBuilder{
        this.format= format;
        return this ;
    }
    setOrder_id(id:number):bookBuilder{
        this.order_id=id
        return this;
    }
    setBookTitle(title:string):bookBuilder{
        this.book_title= title;
        return this ;
    }
   setAuthore(Author:string):bookBuilder{
        this.Author= Author;
        return this ;
    }
    setLang(Language:string):bookBuilder{
        this.Language=Language;
        return this;
    }
    setgenre(genre:string):bookBuilder{
        this.genre= genre;
        return this ;
    }

    build():bookOrder{
        const requiredPropes=[
            this.order_id,
            this.Author,
            this.price,
            this.genre,
            this.book_title,
            this.Language,
            this.packaging,
            this.publisher,
            this.format,
            this.quantity,
            this.special_edition,
        ]

        for (const propertie in requiredPropes){
            if(!propertie){
                throw new Error("missing a properti can't build the book");
            }
        }
        return new bookOrder( 
           this.order_id,
    this.book_title,
      this.Author,
      this.Language,
      this.genre,
      this.format,
      this.publisher,
      this.special_edition,
      this.packaging,
      this.price,
      this.quantity,)
    }

}