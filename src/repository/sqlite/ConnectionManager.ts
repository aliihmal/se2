import config from "../../config"
import { Database as sqliteDatabase , open } from "sqlite";
import {Database ,Statement} from "sqlite3";
import { DataBseConnectioError } from "../../util/exeptions/DataBseConnectioError";
import logger from "../../util/logger";
export class ConnectionManager  { 
      //here we're applying the singleton principel  which we implement it in a function called getinstance "which at first create the instance but when it's called again it return the smae instance " 
    private static db : sqliteDatabase<Database,Statement> | null = null;
        private constructor(){};
         public static async getConnection():Promise <sqliteDatabase<Database,Statement>>{
            try{
                 if (this.db=== null){
                    this.db=await open({
                    filename:config.storagePath.sqlite,
                    driver:Database,
                    });
                }
            }catch(error:unknown){
                logger.error("Failed to connect to the database ",error as Error) ;
                throw new DataBseConnectioError("Failed to connect to the data base " ,error as Error);
            }
            
            return this.db;
        } 
}