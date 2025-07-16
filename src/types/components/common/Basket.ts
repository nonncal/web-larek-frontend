interface IBasketView {
  items: HTMLElement[];
  total: number;
}

type BasketItem = Pick<IProductItem, 'id' | 'title' | 'price'>;