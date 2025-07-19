import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class Card extends Component {
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _description?: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _button?: HTMLButtonElement;
  protected _category?: HTMLElement;

  constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._title = ensureElement<HTMLElement>(`${blockName}__title`, container);
    this._price = ensureElement<HTMLElement>(`${blockName}__price`, container);
    this._description = container.querySelector(`${blockName}_text`);
    this._image = container.querySelector(`${blockName}__image`);
    this._button = container.querySelector(`${blockName}__button`);
    this._category = container.querySelector(`${blockName}__category`);

    if(actions?.onClick) {
      if(this._button) {
        this._button.addEventListener('click', actions.onClick);
      } else {
        this.container.addEventListener('click', actions.onClick);
      }
    }
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }

  get id() {
    return this.container.dataset.id || '';
  }

  set title(value: string) {
    this.setText(this._title, value);
  }
  
  get title() {
    return this._title.textContent || '';
  }

  set image(value: string) {
    this.setImage(this._image, value);
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  set price(value: number) {
    this.setText(this._price, value);
  }

  get price() {
    return Number(this._price.textContent) || 0; //@todo или null возвращать?
  }

  set category(value: string) {
    this.setText(this._category, value);
  }
}

