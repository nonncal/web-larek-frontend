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