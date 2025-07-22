import { IProductItem } from "./AppData";
import { IOrder, IOrderResult } from "./Order";

export interface IMarketApi {
  getProductsList(): Promise<IProductItem[]>;
  orderProducts(order: IOrder, total: number, items: string[]): Promise<IOrderResult>;
}


