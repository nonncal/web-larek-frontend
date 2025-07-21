export interface IOrderForm {
  payment: string;
  phone: string;
  address: string;
  email: string;
}

export interface IOrder extends IOrderForm {
  items: string[];
  total: number;
}

export interface IOrderResult {
  id: string;
  total: number;
}