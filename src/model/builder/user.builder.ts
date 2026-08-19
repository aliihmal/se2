import e from "cors";
import logger from "../../util/logger";
import { User } from "../user.model";
import { toRole } from "../../config/role";

export class UserBuilder{
     private id !:string;
     private name!:string;
     private role!:string;
     private password!:string;
     private email!:string;
     static newBuilder():UserBuilder{
      return new UserBuilder();
     }

     setRoel(role:string):UserBuilder{
      this.role=role;
      return this;
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
        if (!this.id || !this.name ||!this.password ||!this.email || !this.role){
          logger.error("missing some properties");
          throw new Error("missing some properties");
        }
        return new User(
            this.name,
            this.email,
            this.password,
            this.id,
            toRole(this.role)
        );
     }
}