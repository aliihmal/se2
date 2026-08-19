import { SQLITEUser, SQLITEUserMapper } from "../../IMapper/userSQLITE.Mapper";
import { User } from "../../model/user.model";
import { generateUUID } from "../../util";
import { NotFoundException } from "../../util/exeptions/http/NotFoundExecption";
import { DBexception, InitializationException } from "../../util/exeptions/repositoryException";
import logger from "../../util/logger";
import { id, initializabel, initializabelIRepository, IRepository } from "../IRepository";
import { ConnectionManager } from "./ConnectionManager";


const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS "user" (
    id TEXT PRIMARY KEY ,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL
)`;


const CREATE_USER = `INSERT INTO "user" (name,email,password,id,role)  VALUES (?,?,?,?,?) `
const GET_ALL = `SELECT * FROM "user"`;
const GET_ID = `SELECT * FROM "user" WHERE id = ?`;
const UPDATE_ID = `UPDATE "user" SET
                  name = ?,
                  email = ?,
                  password = ?,
                  role = ?
                  WHERE id = ?`;
const DELETE_ID = `DELETE FROM "user" WHERE id = ?`;


const FINDBYEMAIL=`SELECT * FROM "user" WHERE email = ? `;

export class UserRepository implements initializabelIRepository<User>{
    async init(): Promise<void> {
       try{
        const conn = await ConnectionManager.getConnection();
        await conn.exec(CREATE_TABLE);
        await conn.exec(`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user'`)
        logger.info("user table initialized");
       }catch(e ){
          logger.error("Failed to initialized the user Table",e as Error);
          throw new InitializationException("Failed to initialize order Table",e as Error );
       }
    }
    async create(item: User): Promise<id> {
        try{
            const conn = await ConnectionManager.getConnection();
            await conn.run(CREATE_USER,[item.name,item.email,item.password,item.id,item.role]);
            logger.info("The user of id " + item.id + "is inserted into the user table");
            return item.id;
        }catch(error){
            logger.error("Failed to insert the user with id " + item.id );
            throw new DBexception("Failed to insert the user into the databse",error as Error);
        }
    }
    async get(id: id): Promise<User> {
        try{
            const conn = await ConnectionManager.getConnection();
            const data = await conn.get<SQLITEUser>(GET_ID,id);
            if(!data){
                throw new Error("cannot find user of id " + id);
            }
            const mapper = new SQLITEUserMapper();
            return  mapper.map(data);
        
        }catch(error){
            logger.error("Failed to get the user with id " + id );
            throw new DBexception("Failed to get the user into the databse",error as Error);
        }
    }
    async getAll(): Promise<User[]> {
       try{
            const conn = await ConnectionManager.getConnection();
            const data = await conn.all<SQLITEUser[]>(GET_ALL);
            const users :User[]=[];
            const mapper = new SQLITEUserMapper();
            for (const user of data){
                users.push(mapper.map(user));
            }
            return users;
        }catch(error){
            logger.error("Failed to get all  the user with" );
            throw new DBexception("Failed to get  all the user ",error as Error);
        }
    }
    async update(item: User): Promise<void> {
        try{
            const conn =await ConnectionManager.getConnection();
            await conn.run(UPDATE_ID, [
               item.name,
               item.email,
               item.password,
               item.role,
               item.id               
            ]); 
            logger.info("user updated sucsefuly " );
        }catch(error){
             logger.error("Failed to update cake item of id %s error %o " ,item.getId(),error as Error);
            throw new DBexception("Faileto update cake of id" +item.getId()+" error %o " ,error as Error);
        }
    }
    async delete(id: id): Promise<void> {
       try{
            const conn = await ConnectionManager.getConnection();
            await conn.run(DELETE_ID,id);
            logger.info("The user of id " + id + "is deleted from the user table");
          
        }catch(error){
            logger.error("Failed to delete the user with id " +id );
            throw new DBexception("Failed to delete the user from the  databse",error as Error);
        }
    }
    async FindUserByEmail(email:string):Promise<User>{
        
            const mapper  = new SQLITEUserMapper();
            const conn = await ConnectionManager.getConnection();
            const SQLUser =  await conn.get<SQLITEUser>(FINDBYEMAIL,email);
            if(SQLUser == null){
                throw new NotFoundException("user with email " + email + " is not found");
            }
            const User  = mapper.map(SQLUser);
            
            return User;
        
    }

}
export async function CreateUser():Promise<UserRepository>{
        const user = new UserRepository();
        await user.init();
        return user;
    }