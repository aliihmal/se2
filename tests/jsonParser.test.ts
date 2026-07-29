import { assert } from "console";
import { readJSON } from "../src/parsers/jsonParser";
import path from "path";
describe("json Parser tester",()=>{
    test("should return 5 as the quantity of the first order " ,async()=>{
   

        const filePath = path.join(__dirname,"../src/data/book orders.json");
        const data  = await readJSON(filePath);
        const quantity:number = data[0].quantity;
        expect(quantity).toEqual(5);
    });
    test("it should return Edge of Eternity as the title of the first order",async()=>{
        const filePath = path.join(__dirname,"../src/data/book orders.json");
        const data= await readJSON(filePath);
        const bookTitle:string = data[0].book_title;
        expect(bookTitle).toEqual("Edge of Eternity");
    })
    test("should throw an erro if the file path is wrong or empty",async()=>{
        await expect(
    readJSON("")
  ).rejects.toThrow(`Error reading json file:`);
    })
})