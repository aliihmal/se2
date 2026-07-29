import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export enum DBMode{
        SQLITE,
        FILE,
}

export interface TokenPayload extends JwtPayload{
        userId:string;
}
export interface AuthReq extends Request{
        UserId:string;
}