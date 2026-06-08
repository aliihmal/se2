/**
 * Reads a CSV file and returns its contents as a 2D array of strings
 * @param filePath - Path to the CSV file
 * @returns Promise<string[][]> - 2D array of strings
 */
import { readFile } from "fs/promises";
import { promises as fs, writeFile } from 'fs';
export async function readJSON(filepath: string): Promise<any[]> {
    try {
      const data =await readFile(filepath, "utf-8");

    const jsonData = JSON.parse(data);
    return jsonData;
    } catch (error) {
       throw new Error(`Error reading json file dd`);
    }
}

export async function writeJSON(filePath:string,newOrder: object):Promise<void>{
    try{
        const JSONDdata = await readFile(filePath, "utf-8");

        const orders = JSON.parse(JSONDdata);

        orders.push(newOrder);

    await fs.writeFile(
        filePath,
        JSON.stringify(orders, null, 2),
        "utf-8"
    );
    }catch(error){
        throw new Error(`An Error occured while writing into the file ${error}`)
    }
         
}