import dotenv from "dotenv"
import path from "path"
import { isDataView } from "util/types"
dotenv.config({path: path.join(__dirname,'../../.env')})

export default{
     logDir:process.env.LOG_DIR ||"./logs",
     isDev:process.env.NODE_ENV ==="developement",
}