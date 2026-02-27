import { assert } from "console";
import { parseXMLFile } from "../src/parsers/xmlParser";  
   import path from "path";
describe("xml Parser tester",()=>{
    test("should return 7 as the quantity of the first order " ,async()=>{
   

        const filePath = path.join(__dirname,"../src/data/toy orders.xml");
        const data  = await parseXMLFile(filePath);
        const quantity:number = data[0].Quantity;
        expect(quantity).toEqual(7);
    });
    test ("should return Plush Toy as the type of the first element in the row",async()=>{
        const filePath = path.join(__dirname,"../src/data/toy orders.xml");
        const data = await parseXMLFile(filePath);
        const type:string = data[0].Type;
        expect(type).toEqual("Plush Toy");
    });
    test("should throw an wer if the file path is wrong or empty",async()=>{
        await expect(
    parseXMLFile("")
  ).rejects.toThrow(`An error occured`);
    })
})