import { IProductItem } from "./AppData";
import { IOrder, IOrderResult } from "./Order";

export interface IMarketApi {
  getProductsList(): Promise<IProductItem[]>;
  orderProducts(order: IOrder): Promise<IOrderResult>;
}


