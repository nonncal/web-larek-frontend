import { IAppState, IProductItem } from "../types/components/AppData";
import { FormError } from "../types/components/common/Form";
import { IOrder, IOrderForm } from "../types/components/Order";
import { EventEmitter, IEvents } from "./base/events";


export class AppData implements IAppState {
  basket: IProductItem[] = [];
  order: IOrder  = {
  payment: '',
  phone: '',
  address: '',
  email: '',
  items: [],
  total: 0
}; 
  catalog: IProductItem[]; 
  preview: string | null; 
  formErrors: FormError = {}; 

  constructor(data: Partial<IAppState>, protected events: IEvents) {}

  setCatalog(items: IProductItem[]) {
    this.catalog = items;
    this.events.emit('items:changed', {catalog: this.catalog});
  }

  getAvailableProducts(): IProductItem[] {
    return this.catalog.filter(item => item.price !== null);
  }

  setPreview(item: IProductItem) {
    this.preview = item.id;
    this.events.emit('preview:changed', item);
  }

  addToBasket(item: IProductItem) {
    this.basket.push(item);
    this.order.items = this.basket.map(item => item.id);
    this.events.emit('basket:changed', this.basket);
  }

  deleteFromBasket(item: IProductItem) {
    this.basket = this.basket.filter(({id}) => id !== item.id);
    this.order.items = this.basket.map(item => item.id);
    this.events.emit('basket:changed', this.basket);
  }

  clearBasket() {
    this.basket = [];
    this.order.items = [];
    this.events.emit('basket:changed', this.basket);
  }

  getTotal() {
    return this.basket.reduce((acc, item) => acc + item.price, 0);
  }

  getBasketProducts() {
    return this.basket;
  }


  setOrderField(field: keyof IOrderForm, value: string) {
    this.order[field] = value;

    if(this.validateOrder()) {
      this.events.emit('order:ready', this.order);
    }
  } 

  validateOrder() {
    const errors: typeof this.formErrors = {};

    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес';
    }

    if (!this.order.email) {
      errors.email = 'Необходимо указать email';
    }

    if (!this.order.phone) {
      errors.phone = 'Необходимо указать телефон';
    }

    if (!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты';
    } 

    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }
}
