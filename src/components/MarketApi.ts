import { IProductItem } from "../types/components/AppData";
import { IMarketApi } from "../types/components/MarketApi";
import { IOrder, IOrderResult } from "../types/components/Order";
import { Api, ApiListResponse } from "./base/api";


export class MarketApi extends Api implements IMarketApi {
  readonly cdn: string;
  
  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getProductsList(): Promise<IProductItem[]> {
    return this.get('/product').then((res: ApiListResponse<IProductItem>) => {
      return res.items.map(item => ({
        ...item,
        image: this.cdn + item.image
      }))
    })   
  }

  orderProducts(order: IOrder): Promise<IOrderResult> {
    return this.post('/order', order).then((res: IOrderResult) => res);
  }
}