import { IEventEmitter, IFormOrder } from "../../types";
import { Form } from "./Form";

class FormOrder extends Form<IFormOrder> {
  buttonCard: HTMLButtonElement;
  buttonCash: HTMLButtonElement;
  deliveryAddress: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEventEmitter) {
    super(container, events);
  }

  set deliveryAddressValue(value: string) {};

  paymentTypeChangeHandler(){}
}