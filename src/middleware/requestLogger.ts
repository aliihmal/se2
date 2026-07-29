import { NextFunction,Response,Request } from "express";
import logger from "../util/logger";
const requestLogger = (req:Request,res:Response,next:NextFunction)=>{
    const startTime = Date.now();
    res.on('finish',()=>{
    const responseTime= Date.now() - startTime;
    const status =res.statusCode;
      let level= status>=500?'error':status>=400?'warn':'info';
    const {method,originalUrl} = req
      logger.log({level ,message:`${method} ${status} ${originalUrl} ${responseTime}`});
    })
      next();
}

export default requestLogger