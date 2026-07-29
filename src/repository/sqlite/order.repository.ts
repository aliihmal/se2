import { id, initializabel, IRepository } from "../IRepository";
import { IdentifiableOrderItem, IOrder } from "../../model/Iorder";
import logger from "../../util/logger";
import { DBexception, InitializationException } from "../../util/exeptions/repositoryException";
import { ConnectionManager } from "./ConnectionManager";
import { IidentifiableItem, Iitem } from "../../model/Iitem";
import { SQLiteOrder, SQLOrderMapper } from "../../IMapper/Order.Mapper";
import { identifiableOrderBuilder, OrderBuilder } from "../../model/builder/Order.builder";
import { SQLiteCakeMapper } from "../../IMapper/Cake.Mapper";
import { error } from "winston";

const CREATE_TABLE =  `CREATE TABLE IF NOT EXISTS "order"(
                                    id TEXT PRIMARY KEY,
                                    quantity INTEGER NOT NULL,
                                    price INTEGER NOT NULL,
                                    item_category TEXT NOT NULL,
                                    item_id TEXT NOT NULL
                                    )`;
const INSERT_ORDER =   `INSERT INTO "order" (id,quantity,price,item_category,item_id) VALUES(?,?,?,?,?)`;
const GET_ALL = `SELECT * FROM "order" WHERE item_category=?`;


const get = `SELECT * FROM "order" WHERE id= ? `;
const DELETE = `DELETE FROM  "order" WHERE id =(?)`
const UPDATE_ID=`UPDATE "order" SET 
                quantity = ? , price = ?, item_category=?
                ,item_id=? WHERE id =?`
export class OrderRepository implements IRepository<IdentifiableOrderItem>,initializabel{
    
    constructor(private readonly itemRepository:IRepository<IidentifiableItem>&initializabel){
              
    }
    
    /////////////////////////////////////INITIALIZING
    async init () {
        try{
              const conn =await ConnectionManager.getConnection();
              await conn.exec(CREATE_TABLE);
              await this.itemRepository.init();
                logger.info("Order table initialized");
        }catch(e:unknown){
            logger.error("Failed to initialized the order Table",e as Error);
            throw new InitializationException("Failed to initialize order Table",e as Error );
        }
         
    }
    /////////////////////////////////////INITIALIZING

    /////////////////////////////////////CREATING
    async create(order: IdentifiableOrderItem): Promise<id> {
        let conn;
        try{
              conn = await ConnectionManager.getConnection();
             conn.exec("BEGIN TRANSACTION");
             const item_id = await this.itemRepository.create(order.getItem());
             conn.run(INSERT_ORDER,[order.getId(),order.getQuantity(),order.getPrice(),order.getItem().getCategory(),item_id]);
             console.log("order inserted");
             conn.exec("COMMIT");
             return order.getId();

        }catch(error:unknown){
            logger.info("Failed to create Order",error as Error);
             conn && conn.exec("ROLLBACK");
            throw new DBexception("Failed to create Order ",error as Error );
        } 
    }
    /////////////////////////////////////CREATING
    
    /////////////////////////////////////GETTING BY ID
    async get(id: id): Promise<IdentifiableOrderItem> {
        try{
              const conn =await ConnectionManager.getConnection();
              const result = await conn.get<SQLiteOrder>(get,id);
              if ( !result){
                logger.error("order of id "+ id+"not found ");
                throw new Error("order of id "+ id+"not found ");
              }
              const item = await this.itemRepository.get(result.item_id);
              
              return new SQLOrderMapper().map({data : result,item});
        }catch(error :unknown){
            logger.error("Failed to get order of id "+id+"the error is %o"  ,error as Error);
            throw new DBexception("Faileto get the order of the id"+id+"because of %o",error as Error);
        }
        
    }
    /////////////////////////////////////GETTING BY ID
   
    /////////////////////////////////////GETTING ALL
    async getAll(): Promise<IdentifiableOrderItem[]> {
        try {
            const conn =await ConnectionManager.getConnection();
            const items = await this.itemRepository.getAll();
            if(items.length ==0){
                return [];
            }
            const orders = await conn.all<SQLiteOrder[]>(GET_ALL,items[0].getCategory());
           const bindedOrder =orders.map((order)=>{
            const item = items.find((item)=>item.getId()===order.item_id);
            if(!item){
               throw new Error("Cannot find the item of id " + order.item_id);
            }
            return {order,item};
           });
           const mapper = new SQLOrderMapper();
           const identifiableOrders = bindedOrder.map(({order,item})=>{
            return mapper.map({data:order,item});
           })
           return identifiableOrders;
        } catch (error) {
            logger.error("Failed to get all order  " ,error as Error);
            throw new DBexception("Faileto get the all order",error as Error);
        }
            
    }

    
    /////////////////////////////////////GETTING ALL
    async update(item: IdentifiableOrderItem): Promise<void> {
        let conn;
        try{
              conn = await ConnectionManager.getConnection();
             conn.exec("BEGIN TRANSACTION");
              await this.itemRepository.update(item.getItem());
             await conn.run(UPDATE_ID,[item.getQuantity(),item.getPrice(),item.getItem().getCategory(),item.getItem().getId(),item.getId()]);
             console.log("order updated");
             conn.exec("COMMIT");

        }catch(error:unknown){
            logger.info("Failed to update Order of %s %o",item.getId(),error as Error);
             conn && conn.exec("ROLLBACK");
            throw new DBexception("Failed to update Order of "+item.getId()+" %o",error as Error );
        }
    }

    /////////////////////////////////////////////DELETING
    async delete(id: id): Promise<void> {
        let conn;
        try{
              conn = await ConnectionManager.getConnection();
             conn.exec("BEGIN TRANSACTION");
              const theOrder= await this.get(id);
              await this.itemRepository.delete(theOrder.getItem().getId());
             await conn.run(DELETE,[id]);
             console.log("order deleted");
             conn.exec("COMMIT");

        }catch(error:unknown){
            logger.info("Failed to create Order",error as Error);
             conn && conn.exec("ROLLBACK");
            throw new DBexception("Failed to create Order ",error as Error );
        }
    }

}