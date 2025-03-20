import { IForm, PaymentMethods } from "../../types/view/Form";

class Form implements IForm {
  _form: HTMLFormElement;
  _inputs: NodeList | HTMLInputElement;
  _paymentMethod: PaymentMethods;
  _submitButton: HTMLButtonElement;

  constructor(formTemplate: HTMLTemplateElement) {
  }

  clear() {};

  setInputs(): void {
  }

  validateInput(input: HTMLInputElement): boolean {
    return;
  }

  validateForm(): boolean {
    return;
  }

  setPaymentMethod(method: PaymentMethods): void {
  };
  

  showError(error: string): void {
  }

  hideError(): void {
  }

  setDisabled(element: HTMLElement, state: boolean) {
  }

  submitForm(): void {
  }
}