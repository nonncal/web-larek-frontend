export interface IOrderForm {
  payment: string;
  phone: string;
  address: string;
  email: string;
}

export interface IOrder extends IOrderForm {
  items: string[];
}

export interface IOrderResult {
  id: string;
  total: number;
}