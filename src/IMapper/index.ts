import { IidentifiableItem, itemCategory } from "../model/Iitem";
import { JsonCakeRequestMapper } from "./Cake.Mapper";
import { IMapper } from "./IMapper";
import { JSONRequestOrderMapper } from "./Order.Mapper";

export  class JSONRequestFactory{
    public static create(type:itemCategory):JSONRequestOrderMapper{
        switch(type){
            case itemCategory.CAKE:
                return new JSONRequestOrderMapper(new JsonCakeRequestMapper());
            default:
                throw new Error("unsupported tyep " );
        }
    }
}