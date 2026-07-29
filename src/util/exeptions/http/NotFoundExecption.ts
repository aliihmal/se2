import { httpExecption } from "./httpExecption";

export class NotFoundException extends httpExecption{
    constructor(message: string="Resource not found",details?:Record<string,unknown>){
        super(404,message,details);
        this.name="NotFoundException";
    }
}