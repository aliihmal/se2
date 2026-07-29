import { Cakebuilder, identifiableCakeBuilder } from "../model/builder/cake.builder";
import {  Cake, identifiableCake } from "../model/cake.model";
import { IMapper } from "./IMapper";

    export class CSVCakeMapper implements IMapper<string[],Cake>{
        reverseMap(data: Cake): string[] {
            return [
                data.getType(),
                data.getFlavor(),
                data.getFilling(),
                data.getSize().toString(),
                data.getLayers().toString(),
                data.getFrostingType(),
                data.getFrostingFlavor(),
                data.getDecorationType(),
                data.getDecorationColor(),
                data.getCustomMessage(),
                data.getShape(),
                data.getAllergies(),
                data.getSpecialIngredients(),
                data.getPackagingType()
    ];
        }
        map(data:string[]):Cake{
            
                return ( Cakebuilder.newBuilder()
                .setType(data[1])
                .setFavor(data[2])
                .setFilling(data[3])
                .setSize(data[4])
                .setLayers(parseInt(data[5]))
                .setFrostingType(data[6])
                .setFrostingFlavor(data[7])
                .setDecorationType(data[8])
                .setDecorationColor(data[9])
                .setCustomMessage(data[10])
                .setShape(data[11])
                .setAllergies(data[12])
                .setSpecialIngredients(data[13])
                .setPackagingType(data[14])
                .build());
        
        }
    }
export interface SQLiteCake {
    id: string;
    type: string;
    flavor: string;
    filling: string;
    size: string;
    layers: number;
    frostingType: string;
    frostingFlavor: string;
    decorationType: string;
    decorationColor: string;
    customMessage: string;
    shape: string;
    allergies: string;
    specialIngredients: string;
    packagingType: string;
}

export class SQLiteCakeMapper implements IMapper<SQLiteCake,identifiableCake>{
    reverseMap(data: identifiableCake): SQLiteCake {
        throw new Error("Method not implemented.");
    }
    map(data: SQLiteCake): identifiableCake {
         const cake = Cakebuilder.newBuilder()
            .setType(data.type)
            .setFavor(data.flavor)
            .setFilling(data.filling)
            .setSize(data.size)
            .setLayers(data.layers)
            .setFrostingType(data.frostingType)
            .setFrostingFlavor(data.frostingFlavor)
            .setDecorationType(data.decorationType)
            .setDecorationColor(data.decorationColor)
            .setCustomMessage(data.customMessage)
            .setShape(data.shape)
            .setAllergies(data.allergies)
            .setSpecialIngredients(data.specialIngredients)
            .setPackagingType(data.packagingType)
            .build();  // Build the cake
        
        // Then, create identifiable cake with the built cake and id
        return identifiableCakeBuilder.newBuilder()
            .setCake(cake)
            .setId(data.id)
            .build();
        }
    

}

export class JsonCakeRequestMapper implements IMapper<any, identifiableCake> {
    reverseMap(data: identifiableCake) {
        throw new Error("Method not implemented.");
    }
    map(data: any): identifiableCake {
        const cake = Cakebuilder.newBuilder()
            .setType(data.type)
            .setFavor(data.flavor)
            .setFilling(data.filling)
            .setSize(data.size)
            .setLayers(data.layers)
            .setFrostingType(data.frostingType)
            .setFrostingFlavor(data.frostingFlavor)
            .setDecorationType(data.decorationType)
            .setDecorationColor(data.decorationColor)
            .setCustomMessage(data.customMessage)
            .setShape(data.shape)
            .setAllergies(data.allergies)
            .setSpecialIngredients(data.specialIngredients)
            .setPackagingType(data.packagingType)
            .build();

        return identifiableCakeBuilder.newBuilder()
            .setCake(cake)
            .setId(data.id)
            .build();
    }
}