import { NextFunction, Request, Response } from "express";
import { Permission, ROLE, rolePermission } from "../config/role";
import { AuthenticationException, AuthenticationFailed } from "../util/exeptions/http/AuthenticationException";
import { AuthReq } from "../config/type.D";
import { InsufficientPermissionException, InvalidRoleException } from "../util/exeptions/http/AuthorizationException";
import logger from "../util/logger";
import { NotFoundException } from "../util/exeptions/http/NotFoundExecption";

export function hasPermission(permission:Permission){
    return(req:Request,res:Response,next:NextFunction)=>{
        const autherequest = (req as AuthReq);
        if(!autherequest.user){
            throw new AuthenticationFailed();
        }        
        const userRole = autherequest.user.role;

        if(!rolePermission[userRole]){
            logger.error(`Invalid role: ${userRole}`);
            throw new   InvalidRoleException(userRole);
        }
        if(!rolePermission[userRole].includes(permission)){
            logger.error(`user with role ${userRole} does not have permission ${permission}`)
            throw new InsufficientPermissionException();
        }
        next();
    }
}

export function hasRole(allowedRoles:ROLE[]){
    return (req:Request,res:Response,next:NextFunction)=>{
         const autherequest = (req as AuthReq);
        if(!autherequest.user){
            throw new AuthenticationFailed();
        }        
        const userRole = autherequest.user.role;

        if(!allowedRoles.includes(userRole)){
            logger.error(`user with role ${userRole} does not have access to this resource`);
            throw new InsufficientPermissionException();
        }
    next();
    }
}