import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { Category } from "../types/components/AppData";

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
  protected _index?: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions, protected blockName?: string) {
    super(container);

    this._title = ensureElement<HTMLElement>(`.card__title`, container);
    this._price = ensureElement<HTMLElement>(`.card__price`, container);
    this._description = container.querySelector(`.card__text`);
    this._image = container.querySelector(`.card__image`);
    this._button = container.querySelector(`.card__button`);
    this._category = container.querySelector(`.card__category`);
    this._index = container.querySelector(`.basket__item-index`);

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

  set price(value: string | number) {
    this._price.textContent = value === null ? 'Бесценно' : `${value} синапсов`;
  }

  set available(value: boolean) {
    if(this._button) {
      this._button.disabled = !value;
      this._button.textContent = value ? 'Купить' : 'Недоступно';
    }
  }

  set buttonText(value: string) {
    if(this._button) {
      this._button.textContent = value;
    }
  }

  set index(value: number) {
    this.setText(this._index, String(value));
  }

  get price() {
    return this._price.textContent;
  }

  set category(value: Category) {
    if(this._category) {
    switch(value) {
      case 'другое':
        this._category.classList.add('card__category_other');
        break;
      case 'дополнительное':
        this._category.classList.add('card__category_additional');
        break;
      case 'кнопка':
        this._category.classList.add('card__category_button');
        break;
      case 'софт-скил':
        this._category.classList.add('card__category_soft');
        break;
      case 'хард-скил':
        this._category.classList.add('card__category_hard');
        break;
    }
  }
    this.setText(this._category, value);
  }
}

