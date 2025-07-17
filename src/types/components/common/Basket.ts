import { IProductItem } from "../AppData";

export type BasketItem = Pick<IProductItem, 'id' | 'title' | 'price'>;