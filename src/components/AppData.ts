import { IAppState, IProductItem } from "../types/components/AppData";
import { FormError } from "../types/components/common/Form";
import { IOrder, IOrderForm } from "../types/components/Order";
import { EventEmitter, IEvents } from "./base/events";


export class AppData implements IAppState {
  basket: string[] = [];
  order: IOrder  = {
  payment: 'card',
  phone: '',
  address: '',
  email: '',
  items: []
}; 
  catalog: IProductItem[]; 
  preview: string | null; 
  formErrors: FormError = {}; 

  constructor(data: Partial<IAppState>, protected events: IEvents) {}

  toggleOrderdProducts(id: string) {
    this.order.items = Array.from(new Set([...this.order.items, id]));
  }

  setCatalog(items: IProductItem[]) {
    this.catalog = items;
    this.events.emit('catalog:changed', {catalog: this.catalog});
  }

  // @todo нужен ли getCatalog?

  getCatalog() {
    return this.catalog;
  }

  setPreview(item: IProductItem) {
    this.preview = item.id;
    this.events.emit('preview:changed', item);
  }

  addToBasket(item: IProductItem) {
    this.basket.push(item.id);
    this.order.items = this.basket;
    this.events.emit('basket:changed', this.basket);
  }

  deleteFromBasket(item: IProductItem) {
    this.basket = this.basket.filter(id => id !== item.id);
    this.order.items = this.basket;
    this.events.emit('basket:changed', this.basket);
  }

  clearBasket() {
    this.basket = [];
    this.order.items = [];
    this.events.emit('basket:changed', this.basket);
  }

  getTotal() {
    return this.order.items.reduce((acc, item) => acc + this.catalog.find(product => product.id === item).price, 0);
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

    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }
}
