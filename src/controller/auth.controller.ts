import { Request, Response } from "express";
import { BadRequestException } from "../util/exeptions/http/BadRequestException";
import { AuthenticationService } from "../service/Authentication.service";
import { UserRepository } from "../repository/sqlite/user.repository";
import { UserManager } from "../service/UserManagement.servic";

export class AuthController{

    constructor(private autheService :AuthenticationService,private userservice:UserManager){

    }
    async login(req:Request,res:Response){
        const {email,password} = req.body;
        if(!email || ! password){
            throw new BadRequestException("Email and password are require" ,{
                "email":!email,
                "password":!password,
            })
        }
        const userId = await this.userservice.validateUser(email,password);

        res.status(200).json({
            message:'login successfuly',
            token:this.autheService.generateToken(userId)
        })
    }
    signUp(){

    }
}