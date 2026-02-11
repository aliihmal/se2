import { error } from "console";

export interface Order{
    item:string;
    price:number;
    id:number;
}// first we create the order interface so we can use it dsf

export class orderManagement{
    private orders:Order[] = [] ;
    constructor (private validator:IValidator,private Fcalculator:Icalculator){

    }
    getOrder(){
        return this.orders;
    }
    fetchOrder(orderId:number){
       return this.getOrder().find(order=>order.id===orderId);
    }
    addOrder(item:string,price:number){
           const order:Order ={id:this.orders.length+1,item,price};
            this.validator.validate(order); 
            this.orders.push(order);
    }// here we created an order and passed it to the (validate)method in validator that triggers all the validation tests 

    getTotalRevenu(){
        return this.Fcalculator.getRevenue(this.orders);
    }
    getAvgSales(){
        return this.Fcalculator.getAverageByPower(this.orders);
    }
}

export class PremimumOrderManagement extends orderManagement{
    fetchOrder(orderId:number):Order | undefined{
          console.log("this is the premimum order Manager");
          return super.fetchOrder(orderId);
    }
}
export interface IValidator{
    validate(order:Order):void;
}
export interface itemRetriving{
    getPossbileItem():string[];
}
export class validator implements IValidator{
     constructor(private rules:IValidator[]){
        
     }
    validate(order:Order):void{
        for(const validationTest of this.rules){
            validationTest.validate(order);
        }
    }
   
     
}
//// validate price isn't
export class validatePrice implements IValidator{
    validate(order:Order){
        if (order.price < 0 ){
            throw new Error("Can't have a negative price");
        }
    }
}
//// validate item existince 
export class validateOrder implements IValidator,itemRetriving{
     private static possibleItems = [
        "Sponge",
        "Chocolate",
        "Fruit",
        "Red Velvet",
        "Birthday",
        "Carrot",
        "Marble",
        "Coffee",
    ];
    getPossbileItem(): string []{
        return validateOrder.possibleItems;
    }
    validate(order:Order){
        if (!validateOrder.possibleItems.includes(order.item)){
            throw new Error("the item is not found");
        }
    }
}
//// validate max price
export class maxPriceValidator implements IValidator{
    validate(order:Order){
        if (order.price > 100){
            throw new Error ("The max price is 100 you can't overcome it ");
        }
    }
}

export interface Icalculator{
    getRevenue(orders:Order[]):number;
    getAverageByPower(orders:Order[]):number;
}
export class financeCalculator implements Icalculator{
        public  getRevenue(orders:Order[]){
            let tRevenu =0 ;
            orders.forEach(element => {
                tRevenu += element.price;
            });
            return tRevenu;
        }

        public  getAverageByPower(orders:Order[]){
             return orders.length === 0 ? 0 : this.getRevenue(orders) / orders.length;
        }
}
