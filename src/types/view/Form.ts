export interface IForm {
  _form: HTMLFormElement;

  clear(): void;
  validateInput(input: HTMLInputElement): boolean;
  validateForm(): boolean;
  submitForm(): void;
}

export enum PaymentMethods {
  online = 'online',
  cash = 'cash'
}

export enum FormTypes {
  order = 'order',
  contacts = 'contacts',
}