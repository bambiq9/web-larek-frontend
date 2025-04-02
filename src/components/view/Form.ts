import { IEventEmitter } from "../../types";
import { View } from "../base/View";

interface IFormState {
  valid: boolean;
  errors: string[];
}

export abstract class Form<T> extends View<IFormState> {
  errorElement: HTMLElement;
  submitButton: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEventEmitter) {
    super(container);
  }

  set valid(value: boolean) {
  }

  set errors(data: string) {  
  }

  inputChangeHandler(field: keyof T, value: string) {
  }

  render(data: Partial<T> & IFormState): HTMLElement {
    return;
  }
}