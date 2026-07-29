import { IOrder } from "../../model/Iorder";
import { OrderRepository } from "./order.repository";
import { readCSVFile, writeCSVFile } from "../../util/parser";
import { CSVCakeMapper } from "../../IMapper/Cake.Mapper";
import { CSVOrderMapper } from "../../IMapper/Order.Mapper";
import { DBexception } from "../../util/exeptions/repositoryException";

export class cakeOrderRepository extends OrderRepository{
    private mapper = new CSVOrderMapper(new CSVCakeMapper());
    constructor(private readonly filePath:string){
        super();
    }
    protected async load(): Promise<IOrder[]> {
       try{
       const csv = await readCSVFile(this.filePath);
       return csv.map(this.mapper.map.bind(this.mapper));
       }catch(error:unknown){
        throw new DBexception("Failed to Load Order hererererer" ,error as Error);
       }
    }
    protected async save(orders: IOrder[]): Promise<void> {
        // generate the list of headers
        try{

        
        const header = [
            "id", "Type", "Flavor", "Filling", "Size", "Layers",
            "Frosting Type", "Frosting Flavor", "Decoration Type",
            "Decoration Color", "Custom Message", "Shape", "Allergies",
            "Special Ingredients", "Packaging Type", "Price", "Quantity"
            ];

            const rawItem = orders.map(this.mapper.reverseMap.bind(this.mapper));
           await writeCSVFile(this.filePath,[header,...rawItem]);
           }catch(error :unknown){
            throw new DBexception("Failed to Save  Order " ,error as Error);
           }
    }
    
}