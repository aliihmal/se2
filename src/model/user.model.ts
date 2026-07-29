import { ID } from "../repository/IRepository";

export class User implements ID{

    name:string;
    email:string;
    password:string;
    id:string;
    constructor(name:string,email:string,password:string,id:string){
        this.name=name;
        this.email=email;
        this.id=id;
        this.password=password;
    }
    getId(): string {
       return this.id;
    }

}