import { httpExecption } from "./httpExecption";

export class BadRequestException extends httpExecption{
    constructor(message:string="Bad Request",details?:Record<string,unknown>){
        super(404,message,details);
        this.name="BadRequestException"
    }
}