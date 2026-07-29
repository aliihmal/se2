import { Request, Response } from "express";
import { BadRequestException } from "../util/exeptions/http/BadRequestException";
import { UserManager } from "../service/UserManagement.servic";
import { UserBuilder } from "../model/builder/user.builder";
import { generateUUID } from "../util";
import { User } from "../model/user.model";
import { JSONUserMapper } from "../IMapper/userSQLITE.Mapper";

export class userController{
     constructor(private readonly userService:UserManager){
    
        }
    public async CreateUser(req:Request,res:Response):Promise<void>{
        const {name,email,password} = req.body;
        if(!name || !email|| !password){
            throw new BadRequestException("the name , email and password are required",{
                name:!name,
                email:!email,
                password:!password,
            });
        }
        //validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Invalid email format' });
        return;
        }
        await this.userService.createUser(UserBuilder.newBuilder().setEmail(email).setId(generateUUID("user")).setName(name).setPassword(password).build());
        res.status(201).json({message:"user created sucsefuly"})
    }
    public async getUser(req:Request,res:Response):Promise<void>{
        const id= req.params.id as string;
        if (!id){
            throw new BadRequestException("An id is required " ,{
                "id":!id
            })
        }
        const user = await this.userService.getUser(id);
        res.status(201).json({"user":user});

    }
    public async getAllUser(req:Request,res:Response){
        const users = await this.userService.getAllUsers();
        res.status(201).json({"users":users});
    }
    public async updateUser(req:Request,res:Response){
        const id = req.params.id as string;
         if (!id){
            throw new BadRequestException("An id is required " ,{
                "id":!id
            })
        }
         const { name, email, password } = req.body;

         if(!name || !email|| !password){
            throw new BadRequestException("the name , email and password are required",{
                name:!name,
                email:!email,
                password:!password,
            });
        }
        const user = UserBuilder.newBuilder()
             .setId(id)
             .setName(name)
            .setEmail(email)
            .setPassword(password)
            .build();

        await this.userService.updateUser(user);

    res.status(201).json({
        message: "user updated successfully"
    });
    }

    public async deleteUser(req:Request,res:Response){
        const id = req.params.id as string;
        if (!id){
            throw new BadRequestException("An id is required " ,{
                "id":!id
            })
        }
        await this.userService.deleteUser(id);
        res.status(201).json({"message":"user deleted succesfully"});
    }
    
}