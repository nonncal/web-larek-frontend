interface IMarketApi {
  getProductsList(): Promise<IProductItem[]>;
  orderProducts(order: IOrderForm): Promise<IOrderResult>;
}



