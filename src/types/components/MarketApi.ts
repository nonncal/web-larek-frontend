import { Api, ApiListResponse } from "../../components/base/api";
import { IProductItem } from "./AppData";
import { IOrder, IOrderResult } from "./Order";

interface IMarketApi {
  getProductsList(): Promise<IProductItem[]>;
  orderProducts(order: IOrder): Promise<IOrderResult>;
}


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