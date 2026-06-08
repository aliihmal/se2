import fs from "fs/promises";
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import { ReadXMLFile, writeXML } from "../src/parsers/xmlParser";

describe("XML file reading", () => {

    it("should read XML file", async () => {
        const data = await ReadXMLFile("./src/data/toy orders.xml");
        expect(data).toBeDefined();
    });

    it("should throw error for wrong file path", async () => {
        await expect(ReadXMLFile("./wrong.xml"))
            .rejects
            .toThrow("An error occured");
    });

    it("should return correct number of rows", async () => {
        const data = await ReadXMLFile("./src/data/toy orders.xml");
        expect(data.length).toBe(251);
    });

    it("should return correct first order id", async () => {
        const data = await ReadXMLFile("./src/data/toy orders.xml");
        expect(data[0].OrderID).toBe("5001");
    });

});describe("XML writing", () => {

    let filePath: string;

    beforeEach(async () => {
        filePath = "./test.xml";

        await fs.writeFile(
            filePath,
            `<data></data>`
        );
    });

    afterEach(async () => {
        await fs.unlink(filePath).catch(() => {});
    });

    it("should add a full order row", async () => {

        const newOrder = {
            OrderID: "5002",
            Type: "Robot",
            AgeGroup: "10+",
            Brand: "ToyCo",
            Material: "Plastic",
            BatteryRequired: "No",
            Educational: "Yes",
            Price: "100",
            Quantity: "2"
        };

        await writeXML(filePath, newOrder);

        const data = await ReadXMLFile(filePath);

        expect(data.length).toBe(1);
        expect(data[0].OrderID).toBe("5002");
    });

    it("should append multiple rows", async () => {

        await writeXML(filePath, { OrderID: "1" });
        await writeXML(filePath, { OrderID: "2" });

        const data = await ReadXMLFile(filePath);

        expect(data.length).toBe(2);
        expect(data[1].OrderID).toBe("2");
    });

});