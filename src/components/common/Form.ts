import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Form<T> extends Component {
  protected _button: HTMLButtonElement; 
  protected _errors: HTMLElement; 

  constructor(protected container: HTMLFormElement,protected events: IEvents) {
    super(container);

    this._button = ensureElement<HTMLButtonElement>('.modal__actions');
    this._errors = ensureElement<HTMLElement>('.form__errors');
    
    this.container.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.onInputChange(field, value);
    });

    this.container.addEventListener('submit', (e) => {
      e.preventDefault();
      this.events.emit('order:submit');
    })
  }

  protected onInputChange(field: keyof T, value: string) {
    this.events.emit(`${this.container.name}.${String(field)}:change`, {field, value});
  }

  set valid(value: boolean) {
    this._button.disabled = !value;
  }

  set errors(error: string) {
    this.setText(this._errors, error);
  }

  render(data: Partial<T> & { valid?: boolean; errors?: string }) {
    const {valid, errors, ...inputs} = data;
    this.valid = valid;
    this.errors = errors;
    Object.assign(this, inputs);
    return this.container;
  }
}