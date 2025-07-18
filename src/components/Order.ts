import { IOrderForm } from "../types/components/Order";
import { IEvents } from "./base/events";
import { Form } from "./common/Form";

export class paymentOrder extends Form<IOrderForm> {
  constructor (conatiner: HTMLFormElement,protected events: IEvents) {
    super(conatiner, events);
  }

  set payment(value: 'cash' | 'card') {
    if(value === 'cash') {
      (this.container.elements.namedItem('cash') as HTMLButtonElement).value = value;
    } else {
      (this.container.elements.namedItem('card') as HTMLButtonElement).value = value;
    }

  }
  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
  }
}

export class contactsOrder extends Form<IOrderForm> {
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