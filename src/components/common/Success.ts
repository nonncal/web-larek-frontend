import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface ISuccessActions {
  onClick: () => void;
}

export class Success extends Component {
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions: ISuccessActions) {
    super(container);

    this._button = ensureElement<HTMLButtonElement>('.order-success__close');
    this._button.addEventListener('click', actions.onClick);
  }
}