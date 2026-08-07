import { ID } from "../repository/IRepository";

export class User implements ID{

    name:string;
    email:string;
    password:string;
    id:string;
    role:string;
    constructor(name:string,email:string,password:string,id:string,role:string = "user"){
        this.role=role;
        this.name=name;
        this.email=email;
        this.id=id;
        this.password=password;
    }
    getId(): string {
       return this.id;
    }

}