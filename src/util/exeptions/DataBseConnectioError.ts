export class DataBseConnectioError extends Error{
     constructor(message:string,e:Error){
        super(message);
        this.name = "DB connection Failure"
        this.stack  = e.stack;
        this.message= `${message} : %{e.message}`;
    }
}