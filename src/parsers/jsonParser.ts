/**
 * Reads a CSV file and returns its contents as a 2D array of strings
 * @param filePath - Path to the CSV file
 * @returns Promise<string[][]> - 2D array of strings
 */
import { rejects } from "assert";
import { promises as fs } from 'fs';

export interface bookOrder{
    order_id:number;
    book_title:string;
    Author:string;
    Language: string,
    genre:string;
    format:string;
    publisher:string;
    special_edition:string;
    packaging:string;
    price: number;     
  quantity: number; 
}

export function maptobookOrder(raw:any):bookOrder{
    return {
         order_id:Number (raw["Order ID"]),
    book_title: raw["Book Title"],
    Author: raw["Author"],
    Language: raw["Language"],
    genre: raw["Genre"],
    format: raw["Format"],
    publisher: raw["Publisher"],
    special_edition: raw["Special Edition"],
    packaging: raw["Packaging"],
    price: Number(raw["Price"]),        // ✅ string → number
    quantity: Number(raw["Quantity"]) 

    }
}
export async function readJSON(filepath: string): Promise<bookOrder[]> {
    try {
      const jsonData = await fs.readFile(filepath, "utf-8");
      const orders: bookOrder[] = JSON.parse(jsonData);
       const realData:bookOrder[] = orders.map(maptobookOrder);  
     
      return realData;
    } catch (error) {
       throw new Error(`Error reading json file: ${error}`);
    }
}