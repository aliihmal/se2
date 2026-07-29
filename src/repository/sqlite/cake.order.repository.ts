import config from "../../config";
import { identifiableCake } from "../../model/cake.model";
import { IOrder } from "../../model/Iorder";
import { id, initializabel, IRepository } from "../IRepository";
import { open } from "sqlite";
import { Database } from "sqlite3";
import logger from "../../util/logger";
import { DBexception, InitializationException, ItemNotFoundException } from "../../util/exeptions/repositoryException";
import { ConnectionManager } from "./ConnectionManager";
import { itemCategory } from "../../model/Iitem";
import { SQLiteCake, SQLiteCakeMapper } from "../../IMapper/Cake.Mapper";
const table_name  = itemCategory.CAKE;
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${table_name} (
    id TEXT PRIMARY KEY ,
    type TEXT NOT NULL,
    flavor TEXT NOT NULL,
    filling TEXT NOT NULL, 
    size INTEGER NOT NULL,
    layers INTEGER NOT NULL,
    frostingType TEXT NOT NULL,
    frostingFlavor TEXT NOT NULL,
    decorationType TEXT NOT NULL,
    decorationColor TEXT NOT NULL,
    customMessage TEXT NOT NULL,
    shape TEXT NOT NULL,
    allergies TEXT NOT NULL,
    specialIngredients TEXT NOT NULL,
    packagingType TEXT NOT NULL
)`;
const INSERT_CAKE = `INSERT INTO  ${table_name} (
    id, type, flavor, filling, size, layers, frostingType, frostingFlavor,
    decorationType, decorationColor, customMessage, shape, allergies,
    specialIngredients, packagingType
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const SELECT_ALL=`SELECT * FROM ${table_name}`
const get =`SELECT * FROM "cake" WHERE id = ? `;
const DELETE_ID = `DELETE FROM ${table_name} WHERE id=(?)`;
const UPDATE_ID = `UPDATE ${table_name} SET
                 type = ?, flavor = ?, filling = ?, size = ?, layers = ?, 
                 frostingType = ?, frostingFlavor = ?,decorationType = ?, 
                 decorationColor = ?, customMessage = ?, shape = ?, allergies = ?,
                 specialIngredients = ?, packagingType = ? WHERE id = ?`;
export class CakeRepository implements IRepository<identifiableCake>,initializabel{
    
    async init () {
         try{ 
            const conn =  await ConnectionManager.getConnection();
            await conn.exec(CREATE_TABLE);
                logger.info("cake table initialized");
        }catch(e:unknown){
            logger.error("Failed to initialized the order Table",e as Error);
            throw new InitializationException("Failed to initialize order Table",e as Error );
        }
    }
    async create(item: identifiableCake): Promise<id> {
        try{

        
        const conn = await ConnectionManager.getConnection();
        await conn.run(INSERT_CAKE,[
             item.getId(),
            item.getType(),
            item.getFlavor(),
            item.getFilling(),
            item.getSize(),
            item.getLayers(),
            item.getFrostingType(),
            item.getFrostingFlavor(),
            item.getDecorationType(),
            item.getDecorationColor(),
            item.getCustomMessage(),
            item.getShape(),
            item.getAllergies(),
            item.getSpecialIngredients(),
            item.getPackagingType()
        ]);
        return item.getId();
        }catch(error:unknown){
            logger.error("failed to create cake " ,error as Error);
            throw new DBexception("Failed to insert the cake data " ,error as Error);
        }
        
    }
    async get(id: id): Promise<identifiableCake> {
        try{
              const conn =await ConnectionManager.getConnection();
              const data = await conn.get<SQLiteCake>(get,id);
              if (!data){
                logger.error("Failed to get the item of id " + id);
                throw new ItemNotFoundException("failed to get the item ");
              }
              return new SQLiteCakeMapper().map(data);
        }catch(error :unknown){
            logger.error("Failed to get cake item of id "+id+"the error is %o"  ,error as Error);
            throw new DBexception("Faileto get the cake item of the id"+id+"because of %o",error as Error);
        }
    }
    async getAll(): Promise<identifiableCake[]> {
        try{
              const conn =await ConnectionManager.getConnection();
              const data = await conn.all<SQLiteCake[]>(SELECT_ALL);
              const mapper = new SQLiteCakeMapper();
              return data.map((cake)=>mapper.map(cake));
        }catch(error :unknown){
            logger.error("Failed to get all cake item ");
            throw new DBexception("Faileto get all the cake item  ",error as Error);
        }
    }
    async update(item: identifiableCake): Promise<void> {
        try{
            const conn =await ConnectionManager.getConnection();
            await conn.run(UPDATE_ID, [
                item.getType(),
                item.getFlavor(),
                item.getFilling(),
                item.getSize(),
                item.getLayers(),
                item.getFrostingType(),
                item.getFrostingFlavor(),
                item.getDecorationType(),
                item.getDecorationColor(),
                item.getCustomMessage(),
                item.getShape(),
                item.getAllergies(),
                item.getSpecialIngredients(),
                item.getPackagingType(),
                item.getId()
            ]); 
        }catch(error){
             logger.error("Failed to update cake item of id %s error %o " ,item.getId(),error as Error);
            throw new DBexception("Faileto update cake of id" +item.getId()+" error %o " ,error as Error);
        }
    }
    async delete(id: id): Promise<void> {
        try{
              const conn =await ConnectionManager.getConnection();
              await conn.run(DELETE_ID,[id]);
        }catch(error :unknown){
            logger.error("Failed to delete cake item ");
            throw new DBexception("Faileto delete the cake item  ",error as Error);
        }
    }
    
    
}