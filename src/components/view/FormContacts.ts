import { IEventEmitter, IFormContacts } from "../../types";
import { Form } from "./Form";

class FormContacts extends Form<IFormContacts> {
  email: HTMLInputElement;
  phone: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEventEmitter) {
    super(container, events);
  }

  set emailValue(value: string) {};

  set phoneValue(value: string) {};
}