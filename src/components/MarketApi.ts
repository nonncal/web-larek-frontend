interface IMarketApi {
  getProductsList(): Promise<IProductItem[]>;
  getProduct(id: string): Promise<IProductItem>;
  orderProducts(order: IOrderForm): Promise<IOrderResult>;
}



