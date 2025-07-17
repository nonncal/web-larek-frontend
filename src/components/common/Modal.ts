import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Modal extends Component {
  protected _content: HTMLElement; 
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this._content = ensureElement<HTMLElement>('.modal__content');
    this._button = ensureElement<HTMLButtonElement>('.modal__close');

    this._button.addEventListener('click', () => {
      this.close.bind(this);
      this.events.emit('modal:close');
    });
    this.container.addEventListener('click', () => {
      this.close.bind(this);
      this.events.emit('modal:close');
    });
    this._content.addEventListener('click', (e) => {e.stopPropagation()});
  }

  set content(content: HTMLElement) {
    this._content.replaceChildren(content);
  }

  open() {
    this.container.classList.add('modal_active');
    this.events.emit('modal:open');
  }

  close() {
    this.container.classList.remove('modal_active');
    this.content = null;
    this.events.emit('modal:close');
  }

  render(data: HTMLElement):HTMLElement {
    this.content = data;
    this.open();
    return this.container;
  }
}