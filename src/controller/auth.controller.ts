import { Request, Response } from "express";
import { BadRequestException } from "../util/exeptions/http/BadRequestException";
import { AuthenticationService } from "../service/Authentication.service";
import { UserRepository } from "../repository/sqlite/user.repository";
import { UserManager } from "../service/UserManagement.servic";
import { AuthReq } from "../config/type.D";

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
        this.autheService.persistAuthentication(res,userId);


        
        res.status(200).json({
            message:'login successfuly',
            
        })
    }
    signUp(){

    }
    logout(req:Request,res:Response){
        const authRequest = req as AuthReq;
        this.autheService.clearTokens(res);
        res.status(200).json({message:"Logout successfully "})
    }
}