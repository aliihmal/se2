import { assert } from "console";
import {Order, orderManagement} from "../src/app";
import { IValidator} from "../src/app";
import {Icalculator} from "../src/app";
import{validatePrice} from "../src/app";
import {financeCalculator} from "../src/app";
import {validator} from "../src/app";
import { maxPriceValidator } from "../src/app";
import { validateOrder } from "../src/app";
describe("Order Management",()=>{
        let validators :IValidator;
        let finance:financeCalculator;
        let rules:IValidator[] = [
     new maxPriceValidator(),
     new validateOrder(),
     new validatePrice(),
    ];
       let orManager :orderManagement;
       let baseValidator: (order: Order) => void;

        beforeAll(()=>{
            validators  = new validator(rules);
            finance = new financeCalculator();
        })
        beforeEach(()=>{
            baseValidator  = validators.validate;
            validators.validate = jest.fn();
            orManager = new orderManagement(validators,finance);
        })
        afterEach(()=>{
           validators.validate = baseValidator;
        })
     it("should add an order",()=>{
         // Arange 
           const item = "Sponge";
           const price =12;

           //Act
           orManager.addOrder(item,price);
          
           //Asert 
           expect(orManager.getOrder()).toEqual([{id:1,item,price}]);
        })
        it ("should retreive a specific order",()=>{
        
           const item = "Sponge";
           const price =12;
            orManager.addOrder(item,price);
           expect(orManager.fetchOrder(1)).toEqual({id:1,item,price});

        });
        it("should return totale revenue",()=>{
           const item = "Sponge";
           const price =12;
            orManager.addOrder(item,price);
            orManager.addOrder("Chocolate",12);
            orManager.addOrder("Fruit",12);

            expect(orManager.getTotalRevenu()).toEqual(36);
        })
        it("should return avg",()=>{
           const item = "Sponge";
           const price =12;
            orManager.addOrder(item,price);
            orManager.addOrder("Chocolate",12);
            orManager.addOrder("Fruit",12);
            expect(orManager.getAvgSales()).toEqual(12);
        })
        it("should spy on getRevenu",()=>{
            const item = "Sponge";
            const price = 12;
            orManager.addOrder(item,price);
            const spy = jest.spyOn(finance,'getRevenue');// so here we spyied on the finanace object that ownes the getRevenue method that we want to spy on 

            orManager.getTotalRevenu();
            expect(spy).toHaveBeenCalled();// here we maked sure that it's called 
            expect(spy).toHaveBeenCalledWith([{id:1,item,price}]);//here we maked sure that's called with the proper values 
            expect(spy).toHaveReturnedWith(12);// and here we maked sure that it returned the correct value 
        });
        it("should throw new exeption if validator does not pass",()=>{
             //Arrange 
              const item = "Sponge";
              const price = 12;
              (validators.validate as jest.Mock).mockImplementation(()=>{
                throw new Error("the ordering isn't working anymore");
              });

              expect(()=>orManager.addOrder(item,price)).toThrow("you had an erro while adding order ");
        });

});
