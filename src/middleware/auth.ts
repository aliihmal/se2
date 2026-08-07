import { NextFunction, Request, Response } from "express";
import { AuthenticationFailed } from "../util/exeptions/http/AuthenticationException";
import { AuthenticationService } from "../service/Authentication.service";
import { AuthReq } from "../config/type.D";


const authService = new AuthenticationService();

export function authenticate (req:Request,res:Response,next:NextFunction){
    let token =req.cookies.token;
    const refreshToken= req.cookies.refreshToken;

    if(!token){
        if(!refreshToken){
            throw new AuthenticationFailed();
        }
            const newToken=authService.refreshToken(refreshToken);
            authService.setTokenIntoCookie(res,newToken);
        
       
            token=newToken;
    }
    const payload = authService.verirfyToken(token);
    (req as AuthReq).UserId = payload.userId;
    next(); 
}