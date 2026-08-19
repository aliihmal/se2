import { User } from "../model/user.model";
import { id, initializabelIRepository } from "../repository/IRepository";
import { CreateUser, UserRepository } from "../repository/sqlite/user.repository";
import { generateUUID } from "../util";
import { NotFoundException } from "../util/exeptions/http/NotFoundExecption";

export class UserManager { 
    private userRepository!:UserRepository;

    public async getRepo():Promise<UserRepository>{
        if (!this.userRepository){  
            this.userRepository =await CreateUser();
            
        }
        return this.userRepository;
    }
    public async createUser(user:User){
        
        const id = (await this.getRepo()).create(user);
        return id;
    }
    public async getUser(id:string):Promise<User>{
        
                    const user = await   this.userRepository.get(id);
                    return user;
        }
        // update order by id 
        public async updateUser(user:User):Promise<void>{
            const data  = await this.userRepository.update(user);
        }
    
         //delete order by id 
        public async deleteUser(id:string):Promise<void>{
                const data = await this.userRepository.delete(id);
        }
        // getting all orders 
        public async getAllUsers():Promise<User[]>{
            return (await this.userRepository.getAll());
        }
        //getting the number of user 
        public async getTotalUsers():Promise<number>{
            const users = await this.getAllUsers();
            return users.length;
            
        }
        public async validateUser(email:string,password:string):Promise<User>{
            const user = await (await this.getRepo()).FindUserByEmail(email);
            if(!user){
                throw new NotFoundException("User of email " + email + " not found " );
            }
            if(user.password !=password){
                throw new NotFoundException('Invalid password');
            }
            return user;
        }
}