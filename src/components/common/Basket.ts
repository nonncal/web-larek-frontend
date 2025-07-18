import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Basket extends Component {
  protected _list: HTMLElement; 
  protected _total: HTMLElement; 
  protected _button: HTMLButtonElement; 

  constructor(container: HTMLElement,protected events: IEvents) {
    super(container);

    this._list = ensureElement<HTMLElement>('.basket__list');
    this._total = ensureElement<HTMLElement>('.basket__price');
    this._button = ensureElement<HTMLButtonElement>('.basket__button');

    this._button.addEventListener('click', () => {
      this.events.emit('order:open');
    })

    this.items = [];
  }

  set items(items: HTMLElement[]) {
    if(items) {
      this._list.replaceChildren(...items);
    } else {
      this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {textContent: 'Корзина пуста'}));
    }
  }
  
  set total(value: number) {
    this.setText(this._total, String(value));
  }
}