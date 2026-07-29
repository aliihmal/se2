export class ItemNotFoundException extends Error{
    constructor(message:string){
        super(message);
        this.name= "itemNotFoundException";
    }
}

export class InvalidItemException extends Error{
    constructor(message : string){
        super(message);
        this.name  = "InvalidItemException";
    }
}

export class InitializationException extends Error{
    constructor(message:string,e:Error){
        super(message);
        this.name = "initialization exception";
        this.stack = e.stack;
        this.message = `${message} : %{e.message}`;
    }
}
export class DBexception extends Error{
    constructor(message:string,e:Error){
        super(message);
        this.name = "DB Exception"
        this.stack  = e.stack;
        this.message= `${message} : %{e.message}`;
    }
}