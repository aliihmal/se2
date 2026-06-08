import fs from "fs";
import { Builder, parseString, parseStringPromise } from "xml2js";



export async function ReadXMLFile(filePath: string): Promise<any[]> {
  try{
    const xml = fs.readFileSync(filePath, "utf-8");

  const result = await parseStringPromise(xml, {
    explicitArray: false,
    trim: true,
  });


   let rows = result.data.row;

    // IMPORTANT FIX
    if (!rows) return [];
    if (!Array.isArray(rows)) rows = [rows];

    return rows;
  }catch(error ) {
     throw new Error(`An error occured`);
  }
}

export async function writeXML(filePath:string ,data:any):Promise<void>{
    try {
        const xmlData = fs.readFileSync(filePath, "utf-8");

        parseString(xmlData, (err, result) => {
            if (err) {
                console.log("Parse error:", err);
                return;
            }

            result.data = result.data || {};//If there's no data it will assign it to a an empty object
            result.data.row = result.data.row || [];
            if (!Array.isArray(result.data.row)) {
                 result.data.row = [result.data.row];
                }
            result.data.row.push(data);

            const builder = new Builder();
            const newXml = builder.buildObject(result);

            fs.writeFileSync(filePath, newXml);

            console.log("Data inserted successfully!");
        });

    } catch (error) {
        console.log(error);
    }
}