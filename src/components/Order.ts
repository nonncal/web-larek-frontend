import { IOrderForm } from "../types/components/Order";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Form } from "./common/Form";

export class PaymentOrder extends Form<IOrderForm> {
  protected _buttons: HTMLElement;
  constructor (conatiner: HTMLFormElement,protected events: IEvents) {
    super(conatiner, events);
    this._buttons = ensureElement<HTMLElement>('.order__buttons', conatiner);
    
    this._buttons.addEventListener('click', (e) => {
      const target = e.target as HTMLButtonElement;
      const value = target.name as 'cash' | 'card';
      const field = 'payment' as keyof IOrderForm;
      this.onInputChange(field, value);
    })

    this._submit.addEventListener('click', (e) => {
      e.preventDefault();
      this.events.emit('order:next');
    })
  }

set payment(value: 'cash' | 'card') {
  const cashBtn = this.container.elements.namedItem('cash') as HTMLButtonElement;
  const cardBtn = this.container.elements.namedItem('card') as HTMLButtonElement;
  cashBtn.classList.toggle('button_alt-active', value === 'cash');
  cardBtn.classList.toggle('button_alt-active', value === 'card');
}

  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
  }
}

export class ContactsOrder extends Form<IOrderForm> {
   constructor (conatiner: HTMLFormElement,protected events: IEvents) {
    super(conatiner, events);
  }

  set phone(value: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
  }
  set email(value: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
  }
}