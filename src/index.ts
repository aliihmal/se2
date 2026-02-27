import { log } from "winston";
import logger from "./util/logger";
import { readCSVFile } from "./util/parser";
import { readJSON } from "./parsers/jsonParser";
import { parseXMLFile } from "./parsers/xmlParser";
readJSON('src/data/book orders.json')
  .then(data => {
   logger.info(data[0].quantity + 1 
   );       
  }); 
  


// async function main() {
//   const rows = await parseXMLFile('src/data/toy orders.xml');
//   console.log(rows[0]);
// }

// main();