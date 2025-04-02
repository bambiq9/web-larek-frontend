export interface IForm {
  form: HTMLFormElement;

  clear(): void;
  validateInput(input: HTMLInputElement): boolean;
  validateForm(): boolean;
  submitForm(): void;
}

export interface IFormOrder {
  paymentType: string;
  deliveryAddress: string;
}

export interface IFormContacts {
  email: string;
  phone: string;
}

export type FormOrderData = {
  address: string;
  payment: PaymentMethods;
}

export type FormContactsData = {
  email: string;
  phone: string;
}

export enum PaymentMethods {
  online = 'online',
  cash = 'cash'
}

export enum FormTypes {
  order = 'order',
  contacts = 'contacts',
}