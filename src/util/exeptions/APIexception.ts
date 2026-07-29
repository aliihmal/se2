export class APIException extends Error{
    public status:number;
    constructor(status:number,message:string){
        super(message);
        this.status = status
        this.name="APIException";
        this.message  = `${message}`
    }
}