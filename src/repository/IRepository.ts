export type id=string;
export interface ID{
    getId():string;
}

export interface initializabel{ 
     init():Promise<void>;
}


export interface IRepository <T>{
      // Invalid Item
      create(item:T):Promise<id>;
      
      // Throws an error if item not found 
      get(id:id):Promise<T>;
      getAll():Promise<T[]>;

      //throw item not found || invalid item
      update(item:T):Promise<void>;

      //throw item not found    
      delete(id:id):Promise<void>;
}


export interface initializabelIRepository <T extends ID> extends initializabel, IRepository<T>{

}