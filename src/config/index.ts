import dotenv from "dotenv"
import path from "path"
import { isDataView } from "util/types"
import type { StringValue } from 'ms';
import { DBMode } from "./type.D"
dotenv.config({path: path.join(__dirname,'../../.env')})

export default{
     logDir:process.env.LOG_DIR ||"./logs",
     isDev:process.env.NODE_ENV ==="developement",
     isProduction:process.env.NODE_ENV == "production",
     storagePath:{
          csv:{
               cake:"src/data/cake_orders_database.csv",
          },
          sqlite: 'src/data/orders.db',
          
     },
     port:process.env.PORT?parseInt(process.env.PORT): 3000,
     host: process.env.HOST || 'localhost',
     dbMode:DBMode.SQLITE,
     auth:{
          secretKey:process.env.JWT_SECRET_KEY || "secret_1234567890",
          tokenExpiration:(process.env.TOKEN_EXPIRATION || "15m") as StringValue,
          refreshTokenExpiration:(process.env.REFRESH_TOKEN_EXPIRATION || "7d") as StringValue
     }
}

