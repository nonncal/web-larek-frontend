import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Modal extends Component {
  protected _content: HTMLElement; 
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this._content = ensureElement<HTMLElement>('.modal__content', container);
    this._button = ensureElement<HTMLButtonElement>('.modal__close', container);

    this._button.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', this.close.bind(this));
    this._content.addEventListener('click', (e) => e.stopPropagation());
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  open() {
    this.container.classList.add('modal_active');
    this.events.emit('modal:open');
  }

  close() {
    this.container.classList.remove('modal_active');
    this._content.replaceChildren();
    this.events.emit('modal:close');
  }
    render(data: {content: HTMLElement}): HTMLElement {
      super.render(data);
      this.open();
      return this.container;
    }
}