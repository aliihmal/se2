import { Cake, identifiableCake } from "../cake.model";
import logger from "../../util/logger";
export class Cakebuilder {
  
      private type !: string;
      private flavor!: string;
      private filling!: string;
      private size!: string;
      private layers!: number;
      private  frostingType!: string;
      private  frostingFlavor!: string;
      private  decorationType!: string;
      private  decorationColor!: string;
      private  customMessage!: string;
      private  shape!: string;
      private  allergies!: string;
      private  specialIngredients!: string;
      private  packagingType!: string

      
      public static newBuilder(){
        return new Cakebuilder();
      }

      setType(type: string): Cakebuilder {
        this.type = type;
        return this;
      }

      setFavor(flavor: string): Cakebuilder {
        this.flavor = flavor;
        return this;
      }

      setFilling(filling: string): Cakebuilder {
        this.filling = filling;
        return this;
      }

      setSize(size: string): Cakebuilder {
        this.size = size;
        return this;
      }

      setLayers(layers: number): Cakebuilder {
        this.layers = layers;
        return this;
      }

      setFrostingType(frostingType: string): Cakebuilder {
        this.frostingType = frostingType;
        return this;
      }

      setFrostingFlavor(frostingFlavor: string): Cakebuilder {
        this.frostingFlavor = frostingFlavor;
        return this;
      }

      setDecorationType(decorationType: string): Cakebuilder {
        this.decorationType = decorationType;
        return this;
      }

      setDecorationColor(decorationColor: string): Cakebuilder {
        this.decorationColor = decorationColor;
        return this;
      }

      setCustomMessage(customMessage: string): Cakebuilder {
        this.customMessage = customMessage;
        return this;
      }

      setShape(shape: string): Cakebuilder {
        this.shape = shape;
        return this;
      }

      setAllergies(allergies: string): Cakebuilder {
        this.allergies = allergies;
        return this;
      }

      setSpecialIngredients(specialIngredients: string): Cakebuilder {
        this.specialIngredients = specialIngredients;
        return this;
      }

      setPackagingType(packagingType: string): Cakebuilder {
        this.packagingType = packagingType;
        return this;
      }
        build(): Cake {
                const requiredProperties = [
        this.type,
        this.flavor,
        this.filling,
        this.size,
        this.layers,
        this.frostingType,
        this.frostingFlavor,
        this.decorationType,
        this.decorationColor,
        this.customMessage,
        this.shape,
        this.allergies,
        this.specialIngredients,
        this.packagingType
  ];     
         let i =0 ;
      for (const property of requiredProperties) {
        i++;
        if (!property ) {
          console.log(i);
          logger.error("All properties must be set before building the cake.");
          throw new Error("All properties must be set before building the cake.");
        }   
      }
        return new Cake(
            this.type,
            this.flavor,
            this.filling,
            this.size,
            this.layers,
            this.frostingType,
            this.frostingFlavor,
            this.decorationType,
            this.decorationColor,
            this.customMessage,
            this.shape,
            this.allergies,
            this.specialIngredients,
            this.packagingType
        );
    
  }
}

export class identifiableCakeBuilder{
     private id !:string;
     private cake!:Cake;
     static newBuilder():identifiableCakeBuilder{
      return new identifiableCakeBuilder();
     }
     setId(id:string):identifiableCakeBuilder{
      this.id = id ;
      return this;
     }
     
     setCake(cake:Cake):identifiableCakeBuilder{
      this.cake=cake;
      return this ;
     }
     build():identifiableCake{
        if (!this.id || !this.cake){
          logger.error("missing some properties");
          throw new Error("missing some properties");
        }
        return new identifiableCake(
            this.id,
            this.cake.getType(),
            this.cake.getFlavor(),
            this.cake.getFilling(),
            this.cake.getSize(),
            this.cake.getLayers(),
            this.cake.getFrostingType(),
            this.cake.getFrostingFlavor(),
            this.cake.getDecorationType(),
            this.cake.getDecorationColor(),
            this.cake.getCustomMessage(),
            this.cake.getShape(),
            this.cake.getAllergies(),
            this.cake.getSpecialIngredients(),
            this.cake.getPackagingType()
        );
     }
}