import e from "cors";
import logger from "../../util/logger";
import { User } from "../user.model";

export class UserBuilder{
     private id !:string;
     private name!:string;
     
     private password!:string;
     private email!:string;
     static newBuilder():UserBuilder{
      return new UserBuilder();
     }
     setId(id:string):UserBuilder{
      this.id = id ;
      return this;
     }
     
     setName(name:string):UserBuilder{
      this.name=name;
      return this ;
     }
     
     setEmail(email:string):UserBuilder{
      this.email=email;
      return this ;
     }
     setPassword(password:string):UserBuilder{
        this.password=password;
        return this;
     }
     
     build():User{
        if (!this.id || !this.name ||!this.password ||!this.email){
          logger.error("missing some properties");
          throw new Error("missing some properties");
        }
        return new User(
            this.name,
            this.email,
            this.password,
            this.id,
        );
     }
}