import { IOrderForm } from "./Order";

export type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export interface IProductItem {
  title: string;
  price: number | null;
  category: Category;
  image: string;
  id: string;
  description: string;
}

export interface IAppState {
  catalog: IProductItem[];
  order: IOrderForm;
  preview: string | null;
}