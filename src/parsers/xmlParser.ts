import fs from "fs";
import { parseStringPromise } from "xml2js";

interface OrderRow {
  OrderID: number;
  Type: string;
  AgeGroup: string;
  Brand: string;
  Material: string;
  BatteryRequired: string;
  Educational: string;
  Price: number;
  Quantity: number;
}

export async function parseXMLFile(filePath: string): Promise<OrderRow[]> {
  try{
    const xml = fs.readFileSync(filePath, "utf-8");

  const result = await parseStringPromise(xml, {
    explicitArray: false,
    trim: true,
  });

  const rows: OrderRow[] = result.data.row.map((r: any) => ({
    OrderID: Number(r.OrderID),
    Type: r.Type,
    AgeGroup: r.AgeGroup,
    Brand: r.Brand,
    Material: r.Material,
    BatteryRequired: r.BatteryRequired,
    Educational: r.Educational,
    Price: Number(r.Price),
    Quantity: Number(r.Quantity),
  }));

  return rows;
  }catch(error ) {
     throw new Error(`An error occured`);
  }
   // ✅ important
}