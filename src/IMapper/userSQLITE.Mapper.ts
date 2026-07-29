import { UserBuilder } from "../model/builder/user.builder";
import { User } from "../model/user.model";
import logger from "../util/logger";
import { IMapper } from "./IMapper";

export interface SQLITEUser {
    id: string;
    name:string;
    email:string;
    password:string;
}

export class SQLITEUserMapper implements IMapper<SQLITEUser,User>{
    map(data: SQLITEUser): User {
       try{
          const userbuilder = UserBuilder.newBuilder();
          const user  =userbuilder.setName(data.name).setId(data.id).setPassword(data.password).setEmail(data.email).build();
          return user;
       }catch(error){
        logger.error("Cannot build user ");
        throw new Error("Canoot build user " ) ;
       }
    }
    reverseMap(data: User): SQLITEUser {
        throw new Error("Method not implemented.");
    }
    
}

export class JSONUserMapper implements IMapper<any,User>{
    map(data: any): User {
        try{
            const user  = UserBuilder.newBuilder().setEmail(data.email).setId(data.id).setName(data.name).setPassword(data.password).build();
            return user;
        }catch(error){
            logger.error("Error while mapping json response from json to user ");
            throw new Error("Error while mapping json response from json to user "+ error);
        }

    }
    reverseMap(data: User) {
        throw new Error("Method not implemented.");
    }
    
}