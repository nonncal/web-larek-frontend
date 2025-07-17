import { IProductItem } from "./AppData";
import { IOrderForm, IOrderResult } from "./Order";

interface IMarketApi {
  getProductsList(): Promise<IProductItem[]>;
  orderProducts(order: IOrderForm): Promise<IOrderResult>;
}



