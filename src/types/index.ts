type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

interface IProductItem {
  title: string;
  price: number;
  category: Category;
  image: string;
  id: string;
  description?: string;
}

type BasketItem = Pick<IProductItem, 'id' | 'title' | 'price'>;

interface IOrderForm {
  payment: 'cash' | 'card';
  phone: string;
  address: string;
  email: string;
}

interface IOrder extends IOrderForm {
  items: string[];
}

interface IOrderResult {
  id: string;
  total: number;
}

interface IAppState {
  catalog: IProductItem[];
  order: IOrder | null;
  preview: boolean;
}

type FormError = Partial<Record<keyof IOrderForm, string>>