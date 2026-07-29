import { NextFunction, Request, Response } from "express";
import { AuthenticationFailed } from "../util/exeptions/http/AuthenticationException";
import { AuthenticationService } from "../service/Authentication.service";
import { AuthReq } from "../config/type.D";


const authService = new AuthenticationService();

export function authenticate (req:AuthReq,res:Response,next:NextFunction){
    const token = req.headers['authorization']?.split(' ')[1];


    if(!token){
        throw new AuthenticationFailed();
    }
    const payload = authService.verirfyToken(token);
    req.UserId = payload.userId;
    next(); 
}