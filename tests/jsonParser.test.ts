import { read } from "fs";
import { describe, it, expect, beforeEach, afterEach, jest } from "@jest/globals";

import { readJSON, writeJSON } from "../src/parsers/jsonParser"; // change path
import fs from "fs/promises";
describe("JSON file reading", () => {
        it("should read the file",async ()=>{
           const data = await readJSON("./src/data/book orders.json");
            expect(data).toBeDefined();
            
        });
        it("should throw an Error when the file path is wrong",async()=>{
            expect(readJSON('./wrongFilePath')).rejects.toThrow("Error reading json file dd");
        });
        it("should return exactly 351 item in the string array",async()=>{
            const data = await readJSON("./src/data/book orders.json");
            expect(data.length).toEqual(351);
        })
        it("should return the correct order id for the first element ",async()=>{
            const data = await readJSON("./src/data/book orders.json");
            expect(data[0]["Order ID"]).toEqual("2001");
        })
   
});
describe("JSON file writing",()=>{
     let filePath: string;

    beforeEach(async () => {
        filePath = "./test.json";
        await fs.writeFile(filePath, JSON.stringify([]));
    });

    afterEach(async () => {
        await fs.unlink(filePath).catch(() => {});
    });
     it("should add a new order", async () => {
       
        const newOrder = {
            "Order ID": "2003",
            "Book Title": "Test Book"
        };

        await writeJSON(filePath, newOrder);
        const data = await readJSON(filePath);

        expect(data).toEqual([newOrder]);
    });
    it("should retrieve existing orders", async () => {

        const order = {
            "Order ID": "2001",
            "Book Title": "Book A"
        };

        await writeJSON(filePath, order);

        const data = await readJSON(filePath);

        
        expect(data[0]).toEqual(order);
    });
    it("should spy on writeFile being called", async () => {
      
        const spy = jest.spyOn(fs, "writeFile");

        const order = {
            "Order ID": "2005",
            "Book Title": "Spy Book"
        };

        await writeJSON(filePath, order);

        expect(spy).toHaveBeenCalled();
    });
})