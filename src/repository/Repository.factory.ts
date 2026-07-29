import { IOrder } from "../model/Iorder";
import { IRepository } from "./IRepository";
import { itemCategory } from "../model/Iitem";
import config from "../config";
import { cakeOrderRepository } from "./file/cake.order.repository";
import { initializabel } from "./IRepository";
import { OrderRepository } from "./sqlite/order.repository";
import { CakeRepository } from "./sqlite/cake.order.repository";
import { IdentifiableOrderItem } from "../model/Iorder";
import { DBMode } from "../config/type.D";

export class RepositoryFactory {

    public static async create(mode: DBMode, category: itemCategory): Promise<IRepository<IdentifiableOrderItem>> {

        switch (mode) {

            case DBMode.SQLITE:
                let repository: IRepository<IdentifiableOrderItem> & initializabel;

                switch (category) {
                    case itemCategory.CAKE:
                        repository = new OrderRepository(new CakeRepository());
                        break;
                    default:
                        throw new Error("Unsupported category");
                }

                await repository.init();
                return repository;

            case DBMode.FILE:
                throw new Error("this is deprecated");

            default:
                throw new Error("Unsupported DB mode");
        }
    }
}