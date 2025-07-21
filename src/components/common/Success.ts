import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface ISuccessActions {
  onClick: () => void;
}

export class Success extends Component {
  protected _button: HTMLButtonElement;
  protected _total: HTMLElement;
  constructor(container: HTMLElement, actions: ISuccessActions) {
    super(container);

    this._button = ensureElement<HTMLButtonElement>('.order-success__close', container);
    this._button.addEventListener('click', actions.onClick);
    this._total = ensureElement<HTMLElement>('.order-success__description', container);
  }

  set total(value: number) {
    this.setText(this._total, `Списано ${String(value)} синапсов`);
  }
}