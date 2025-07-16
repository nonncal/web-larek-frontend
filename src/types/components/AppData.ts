type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

interface IProductItem {
  title: string;
  price: number | null;
  category: Category;
  image: string;
  id: string;
  description: string;
}

interface IAppState {
  catalog: IProductItem[];
  order: IOrder | null;
  preview: string | null;
}